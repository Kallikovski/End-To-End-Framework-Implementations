import { Request, Response } from "express";
import { User } from "./schema";

export class Controller
{
    public async signup(req: Request, res: Response)
    {
        await User.findOne({ email: req.body.email }).then(async (value) =>
        {
            try
            {
                if (value !== null)
                {
                    throw new Error('This email is already taken!')
                }
                const user = new User(req.body)
                user.password = await user.hashPassword()
                const token = await user.generateAuthToken()
                await user.save()
                res.status(201).send({ token })
            } catch (error)
            {
                console.log(error)
                res.status(400).send(error)
            }
        }).catch((error) =>
        {
            console.log(error)
            res.status(500).send(error)
        })
    }
    public async signin(req: Request, res: Response)
    {
        try
        {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            await user.save()
            res.status(200).send({ token })
        } catch (error)
        {
            console.log(error)
            res.status(400).send(error)
        }
    }
    public async signout(req: Request, res: Response)
    {
        try
        {
            req.user.tokens = req.user.tokens.filter((token) =>
            {
                return token.token !== req.token
            })
            await req.user.save()
            res.status(200).send()
        } catch (error)
        {
            console.log(error)
            res.status(400).send(error)
        }
    }
    public async profile(req: Request, res: Response)
    {
        try
        {
            res.status(200).send(await req.user.profileData())
        } catch (error)
        {
            console.log(error)
            res.status(400).send(error)
        }
    }
    public async update(req: Request, res: Response)
    {
        try
        {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['surname', 'lastname', 'occupation', 'age', 'email']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
            if (!isValidOperation)
            {
                throw new Error('Invalid updates!')
            }
            User.updateOne({ _id: req.user._id }, await req.body, { upsert: true }).then(async () =>
            {
                const updatedUser = await User.findOne({
                    _id: req.user._id,
                })
                res.status(200).send(await updatedUser?.profileData())
            }).catch((error) =>
            {
                console.log(error)
                res.status(500).send(error)
            })
        } catch (error)
        {
            console.log(error)
            res.status(400).send(error)
        }
    }
    public async delete(req: Request, res: Response)
    {
        try
        {
            await User.deleteOne({ _id: req.user._id })
            res.status(201).send()
        } catch (error)
        {
            console.log(error)
            res.status(400).send(error)
        }
    }
}
