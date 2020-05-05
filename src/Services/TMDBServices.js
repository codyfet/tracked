import axios from "axios";

const API_KEY = "37662c76ffc19e5cd1b95f37d77155fc";

/**
 * Осуществляет обращение к TMDb для поиска фильмов по подстроке.
 *
 * @param {string} searchInput Значение для поиска.
 */
export function searchMoviesByTitle(searchInput) {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchInput}&page=1&include_adult=false`);
}