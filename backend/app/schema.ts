import { Document, Schema, model, Model } from "mongoose";
import { JwtPayload, sign } from "jsonwebtoken";
import { hash, genSalt, compare } from "bcrypt"


export interface Profile
{
    surname: string;
    lastname: string;
    age: string;
    occupation: string;
    email: string;
}

export interface IUser extends Document
{
    surname: string;
    lastname: string;
    age: string;
    occupation: string;
    email: string;
    password: string;
    tokens: { _id: string | JwtPayload; token: string; }[];
    generateAuthToken: () => string;
    hashPassword: () => string;
    profileData: () => Profile;
}

export interface IModelUser extends Model<IUser>
{
    findByCredentials(email: string, password: string): Promise<IUser>
}


export const userSchema: Schema = new Schema({
    surname: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        unique: false,
        required: false,
    },
    occupation: {
        type: String,
        unique: false,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});

userSchema.methods.hashPassword = async function ()
{
    return hash(this.password, await genSalt(10));
}

userSchema.methods.generateAuthToken = async function ()
{
    const user = this
    const token = sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET as string)
    user.tokens = user.tokens.concat({
        token
    })
    return token;
};

userSchema.methods.profileData = async function ()
{
    const user = this;
    const profile: Profile = {
        surname: user.surname,
        lastname: user.lastname,
        occupation: user.occupation,
        age: user.age,
        email: user.email
    }
    return profile
}

userSchema.statics.findByCredentials = async function (email: string, password: string): Promise<IUser>
{
    const user = await User.findOne({
        email
    })
    if (!user)
    {
        throw new Error('Email or password wrong')
    }
    const isMatch = await compare(password, user.password)
    if (!isMatch)
    {
        throw new Error('Email or password wrong')
    }
    return user
};


export const User = model<IUser, IModelUser>("User", userSchema);
