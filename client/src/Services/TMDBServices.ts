import axios from "axios";

const API_KEY = "37662c76ffc19e5cd1b95f37d77155fc";

const REST_URL = "https://api.themoviedb.org/3";

/**
 * Осуществляет обращение к TMDb для поиска фильмов по подстроке.
 *
 * @param {string} searchInput Значение для поиска.
 */
export function searchMoviesByTitle(searchInput: string) {
    return axios.get(
        `${REST_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchInput}&page=1&include_adult=false`
    );
}

/**
 * Осуществляет обращение к TMDb для получения детальной информации о фильме.
 *
 * @param {number} movie_id Идентификатор запрашиваемого фильма.
 */
export function getMovieDetailsById(movie_id: number) {
    return axios.get(`${REST_URL}/movie/${movie_id}?api_key=${API_KEY}&language=ru-RU`);
}

/**
 * Осуществляет обращение к TMDb для получения информации о персонах, участвующих в создании (cast).
 *
 * @param {number} movie_id Идентификатор запрашиваемого фильма.
 */
export function getMovieCreditsById(movie_id: number) {
    return axios.get(`${REST_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`);
}

/**
 * Осуществляет обращение к TMDb для поиска сериалов по подстроке.
 *
 * @param {string} searchInput Значение для поиска.
 */
export function searchTvSeriesByTitle(searchInput: string) {
    return axios.get(
        `${REST_URL}/search/tv?api_key=${API_KEY}&language=ru-RU&query=${searchInput}&page=1&include_adult=false`
    );
}

/**
 * Осуществляет обращение к TMDb для получения детальной информации о сериале.
 *
 * @param {number} tv_id Идентификатор запрашиваемого сериала.
 */
export function getTvSeriesDetailsById(tv_id: number) {
    return axios.get(`${REST_URL}/tv/${tv_id}?api_key=${API_KEY}&language=ru-RU`);
}

/**
 * Возвращает справочник жанров.
 */
export function getGenresFromTMDb() {
    return axios.get(`${REST_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`);
}
