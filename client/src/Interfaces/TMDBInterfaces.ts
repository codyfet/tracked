/**
 * Взято отсюда https://github.com/ravi7mech/tmdbapi_types/blob/master/src/lib/tmdbapi.models.ts
 */

/* CONFIGURATION - API */
export interface ConfigAPI {
    images: Images;
    change_keys: string[];
}

export interface Images {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}

/* CONFIGURATION - COUNTRIES */
export interface ConfigCountries {
    iso_3166_1: string;
    english_name: string;
}

/* CONFIGURATION - LANGUAGES */
export interface ConfigLanguages {
    iso_639_1: string;
    english_name: string;
    name: string;
}

// TRENDING

export interface Trending {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date?: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;

    name?: string;
    first_air_date?: string;
}

export enum OriginalLanguage {
    En = "en",
}

// GET GENRES
export interface Genres {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}
