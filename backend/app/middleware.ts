import { verify, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "./schema";

export class Middleware
{
    public async authenticate(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const header = req.header('Authorization')
            if (!header)
            {
                throw new Error('No Authorization header!')
            }
            const token = header.replace('Bearer ', '');
            const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload
            const user = await User.findOne({
                _id: decoded._id,
                'tokens.token': token
            })
            if (!user)
            {
                throw new Error('User not found!')
            }
            req.token = token;
            req.user = user;
            next()
        } catch (error)
        {
            res.status(401).send({
                error: error
            })
        }
    }
}
