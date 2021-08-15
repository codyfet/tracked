import {ICastItem} from "./CastItem";
import {IGenre} from "./Genre";
import {ICrewItem} from "./CrewItem";

export interface IRecord {
    _id: string;
    userId: string;
    id: number;
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
    cast: ICastItem[];
    crew: ICrewItem[];
    position: string;

    season: string;
    inProduction: boolean;
    numberOfSeasons: boolean;
}
