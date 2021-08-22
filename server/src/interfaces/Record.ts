import mongoose = require("mongoose");
import {ICastItem, ICastItemModel} from "./CastItem";
import {IGenre, IGenreModel} from "./Genre";
import {ICrewItem, ICrewItemModel} from "./CrewItem";

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
    rating: string;
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
export interface IRecordModel extends IRecord, mongoose.Document {
    genres: IGenreModel[];
    cast: ICastItemModel[];
    crew: ICrewItemModel[];
}
