import {Document} from "mongoose";

export interface IFavouriteMovie extends Document {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
}
