import {AxiosResponse} from "axios";
import {ValidationError} from "express-validator";
import {IUser} from "./../../../server/src/interfaces/User";

export interface IClientUser extends IUser {
    _id: string;
    userId: string;
    years: string[];
    token: string;
}

export type IPartialClientUser = Partial<IClientUser>;

export type IUserErrorResponse = AxiosResponse<IUserErrorDataObject>;

export interface IUserErrorDataObject {
    errors: ValidationError[];
    message: string;
}
