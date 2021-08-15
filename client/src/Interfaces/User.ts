import {IUser} from "./../../../server/src/interfaces/User";

export interface IClientUser extends IUser {
    userId: string;
    years: string[];
}

export type IPartialClientUser = Partial<IClientUser>;
