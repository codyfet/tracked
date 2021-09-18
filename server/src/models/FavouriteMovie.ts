import {Schema, model} from "mongoose";
import {IFavouriteMovieDocument} from "../interfaces/FavouriteMovie";

/**
 * Модель Любимый фильм.
 */
const favouriteMovieSchema: Schema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    release_date: {type: String},
    poster_path: {type: String},
    position: {type: Number, required: true},
});

export default model<IFavouriteMovieDocument>("FavouriteModel", favouriteMovieSchema);
