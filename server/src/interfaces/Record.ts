import mongoose = require("mongoose");
import {ICastItem, ICastItemDocument} from "./CastItem";
import {IGenre, IGenreDocument} from "./Genre";
import {ICrewItem, ICrewItewDocument} from "./CrewItem";

/**
 * Модель Записи без mongoose функциональностей (можно использовать в client части).
 */
export interface IRecord {
    // _id: string;
    userId: string;
    // id: number;
    viewdate: Date;
    posterpath: string;
    title: string;
    releaseYear: string;
    originalTitle: string;
    rating: number;
    type: string;
    backdrop_path: string;
    genres: IGenre[];
    overview: string;
    production_countries: string[];
    director: string[];
    reViewed: boolean;
    notFinished: boolean;
    cast?: ICastItem[];
    crew?: ICrewItem[];
    position: string;

    season?: string;
    inProduction?: boolean;
    numberOfSeasons?: number;
}

/**
 * Модель "Записи", обогащённая mongoose функциональностями (для использования на сервере).
 * Также переопределены атрибуты, для которых существуют mongoose-модели.
 */
export interface IRecordDocument extends IRecord, mongoose.Document {
    genres: IGenreDocument[];
    cast: ICastItemDocument[];
    crew: ICrewItewDocument[];
}
