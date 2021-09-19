import {AxiosResponse} from "axios";
import {IUser} from "./../../../server/src/interfaces/User";
import {IErrorDataObject} from "./Common";
import {IClientFavouriteMovie} from "./ClientFavouriteMovie";

export interface IClientUser extends IUser {
    _id: string;
    userId: string;
    years: string[];
    token: string;
    favouriteMovies: IClientFavouriteMovie[];
}

export type IPartialClientUser = Partial<IClientUser>;

export type IUserErrorResponse = AxiosResponse<IErrorDataObject>;
