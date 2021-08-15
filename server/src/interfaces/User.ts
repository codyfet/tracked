import {IRecord} from "./Record";
import {IFavouriteMovie} from "./FavouriteMovie";

/**
 * TODO: Подумать над использованием extends Document.
 */
export interface IUser {
    _id: string;
    email: string;
    password: string;
    username: string;
    favouriteMovies: IFavouriteMovie[];
    records: IRecord[];
}
