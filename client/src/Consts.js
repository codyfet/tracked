/**
 * Адрес для загрузки изобдражений с TMDb.
 */
export const IMAGE_URL = "http://image.tmdb.org/t/p/w92";

/**
 * Имя переменной в локал сторедж для хранения данных о пользователе.
 */
export const TRACKED_USER_DATA = "TRACKED_USER_DATA";

/**
 * Возможные типы записей.
 */
const TYPES = ["movie", "tvseries"];

/**
 * Текущий год.
 */
export const CURRENT_YEAR = new Date().getFullYear();

/**
 * Дефолтный фильтр для сервиса, возвращающего записи пользователя.
 */
export const DEFAULT_RECORDS_FILTER = {
    sortBy: "-viewdate",
    year: CURRENT_YEAR,
    types: TYPES
};
