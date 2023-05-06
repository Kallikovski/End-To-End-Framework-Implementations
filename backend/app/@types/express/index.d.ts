import { IUser } from "../../schema";

declare global
{
    namespace Express
    {
        export interface Request
        {
            token: string;
            user: IUser;
        }
    }
}