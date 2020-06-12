import {map} from "lodash";

/**
 * Класс Record (Запись).
 */
export class Record {
    constructor({userId, type, data}) {
        this.userId = userId;

        if (type === "movie") {
            const {details, credits} = data;

            this.id = details.id;
            this.viewdate = new Date();
            this.posterpath = details.poster_path;
            this.title = details.title;
            this.releaseYear = details.release_date.substring(0, 4);
            this.originalTitle = details.original_title;
            this.rating = "0";
            this.type = "movie";
            this.backdrop_path = details.backdrop_path;
            this.genres = details.genres;
            this.overview = details.overview;
            this.production_countries = map(details.production_countries, (item) => item.iso_3166_1);
            this.director = [credits.crew?.find((crewItem) => crewItem.job === "Director")?.name];
            this.reViewed = false;
            this.notFinished = false;
            this.cast = credits.cast;
            this.crew = credits.crew;
        } else if (type === "tvseries") {
            const {details} = data;

            this.id = details.id,
            this.viewdate = new Date(),
            this.posterpath = details.poster_path,
            this.title = details.name,
            this.releaseYear = details.first_air_date.substring(0, 4),
            this.originalTitle = details.original_name,
            this.rating = "0",
            this.type = "tvseries",
            this.backdrop_path = details.backdrop_path,
            this.genres = details.genres,
            this.overview = details.overview,
            this.production_countries = details.origin_country,
            this.director = map(details.created_by, (p) => p.name),
            this.reViewed = false,
            this.notFinished = false,
            this.season = "1";
            this.inProduction = details.in_production;
            this.numberOfSeasons = details.number_of_seasons;
        }

    }
}