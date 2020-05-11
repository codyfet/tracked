import axios from "axios";

const API_KEY = "37662c76ffc19e5cd1b95f37d77155fc";

const REST_URL = 'https://api.themoviedb.org/3';

/**
 * Осуществляет обращение к TMDb для поиска фильмов по подстроке.
 *
 * @param {string} searchInput Значение для поиска.
 */
export function searchMoviesByTitle(searchInput) {
    return axios.get(`${REST_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchInput}&page=1&include_adult=false`);
}

/**
 * Осуществляет обращение к TMDb для получения детальной информации о фильме.
 *
 * @param {string} id Идентификатор запрашиваемого фильма.
 */
export function getMovieDetailsById(id) {
    return axios.get(`${REST_URL}/movie/${id}?api_key=${API_KEY}&language=ru-RU`);
}

/**
 * Осуществляет обращение к TMDb для получения информации о персонах, участвующих в создании (cast).
 *
 * @param {string} id Идентификатор запрашиваемого фильма.
 */
export function getMovieCreditsById(id) {
    return axios.get(`${REST_URL}/movie/${id}/credits?api_key=${API_KEY}`);
}

/**
 * Возвращает справочник жанров.
 */
export function getGenresFromTMDb() {
    return axios.get(`${REST_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`);
}