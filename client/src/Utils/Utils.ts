import {ERecordType} from "../Enums";
import {IClientRecord} from "../Interfaces/ClientRecord";
import {IAsyncData} from "../Interfaces/Common";
/**
 * Возвращает пустую запись.
 */
export function createEmptyRecord(type: ERecordType = null): IClientRecord {
    return {
        _id: "0",
        viewdate: null,
        posterpath: null,
        title: null,
        releaseYear: null,
        originalTitle: null,
        director: null,
        rating: null,
        type,
        isEmptyRecord: true,
        userId: null,
        id: null,
        backdrop_path: null,
        genres: null,
        overview: null,
        production_countries: null,
        reViewed: false,
        notFinished: false,
        position: null,
    };
}

/**
 * Возвращает пустой контейнер для работы с асинхронными запросами.
 */
export const getInitialAsyncContainer = <T, E = Object>(): IAsyncData<T, E> => ({
    data: null,
    isLoading: false,
    error: null,
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
