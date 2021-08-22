import {
    MovieCredits,
    TVMovieDetailsItem,
    TVSeriesDetailsItem,
} from "./../Interfaces/TMDBInterfaces";
import {ERecordType} from "./../Enums";
import {IClientRecord} from "./../Interfaces/ClientRecord";
import {map} from "lodash";
import {getEmptyTodayDate} from "../Utils/DateUtils";

/**
 * Создает объект "Запись" с фильмом на основе деатльной информации от TMBD, который будет отправлен в БД.
 */
export function createRecordForMovie(
    userId: string,
    details: TVMovieDetailsItem,
    credits: MovieCredits
): IClientRecord {
    return {
        userId,
        id: details.id,
        viewdate: getEmptyTodayDate(),
        posterpath: details.poster_path,
        title: details.title,
        releaseYear: details.release_date.substring(0, 4),
        originalTitle: details.original_title,
        rating: "0",
        type: ERecordType.MOVIE,
        backdrop_path: details.backdrop_path,
        genres: details.genres,
        overview: details.overview,
        production_countries: map(details.production_countries, (item) => item.iso_3166_1),
        director: [credits.crew?.find((crewItem) => crewItem.job === "Director")?.name],
        reViewed: false,
        notFinished: false,
        cast: credits.cast,
        crew: credits.crew,

        position: "0",
    };
}

/**
 * Создает объект "Запись" с сериалом на основе деатльной информации от TMBD, который будет отправлен в БД.
 */
export function createRecordForTVSeries(
    userId: string,
    details: TVSeriesDetailsItem
): IClientRecord {
    return {
        userId,
        id: details.id,
        viewdate: getEmptyTodayDate(),
        posterpath: details.poster_path,
        title: details.name,
        releaseYear: details.first_air_date.substring(0, 4),
        originalTitle: details.original_name,
        rating: "0",
        type: ERecordType.TV_SERIES,
        backdrop_path: details.backdrop_path,
        genres: details.genres,
        overview: details.overview,
        production_countries: details.origin_country,
        director: map(details.created_by, (p) => p.name),
        reViewed: false,
        notFinished: false,
        season: "1",
        inProduction: details.in_production,
        numberOfSeasons: details.number_of_seasons,

        position: "0",
    };
}
