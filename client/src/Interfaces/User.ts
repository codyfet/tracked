import {ValidationError} from "express-validator";
import {IUser} from "./../../../server/src/interfaces/User";

export interface IClientUser extends IUser {
    userId: string;
    years: string[];
}

export type IPartialClientUser = Partial<IClientUser>;

export interface IUserErrorObject {
    errors: ValidationError[];
    message: string;
}
