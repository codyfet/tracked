import {IUser} from "./../../../server/src/interfaces/User";

export interface IClientUser extends IUser {
    years: string[];
}
