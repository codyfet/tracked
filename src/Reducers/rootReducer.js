import {filter, find, findIndex, forEach} from 'lodash';
import {
    ADD_EMPTY_MOVIE_RECORD,
    ADD_EMPTY_TVSERIES_RECORD,
    ADD_RECORD,
    GET_GENRES_FAILURE,
    GET_GENRES_START,
    GET_GENRES_SUCCESS,
    POPULATE_AUTOSUGGEST_FAILURE,
    POPULATE_AUTOSUGGEST_START,
    POPULATE_AUTOSUGGEST_SUCCESS,
    REMOVE_RECORD,
    UPDATE_RECORD
} from "../Actions/ActionTypes";
import {createEmptyRecord} from '../Utils/Utils';

const initialState = {
    genresDictionary: {},
    records: [
        // {
        //     id: "1",
        //     viewdate: '20 апреля',
        //     posterpath: 'xxxxxxxx',
        //     title: 'Снайпер',
        //     releaseYear: '2014',
        //     originalTitle: 'American Sniper',
        //     director: 'Клинт Иствуд',
        //     flag: 'us',
        //     rating: '6',
        //     type: 'movie'
        // },
        // {
        //     id: "2",
        //     viewdate: '18 апреля',
        //     posterpath: 'xxxxxxxx',
        //     title: 'Рэмбо: Последняя кровь',
        //     releaseYear: '2019',
        //     originalTitle: 'Rambo: Last Blood',
        //     director: 'Адриан Грюнберг',
        //     flag: 'us',
        //     rating: '6',
        //     type: 'tvseries'
        // }
    ],
    emptyRecord: {
        isExists: false,
        records: []
    }
};

/**
 * Корневой редюсер.
 */
export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case REMOVE_RECORD:
            return {
                ...state,
                records: filter(state.records, (record) => record.id !== action.payload.id)
            };
        case ADD_EMPTY_MOVIE_RECORD:
            return {
                ...state,
                records: [{...createEmptyRecord(), type: "movie"}, ...state.records],
                emptyRecord: {
                    ...state.emptyRecord,
                    isExists: true
                }
            };
        case ADD_EMPTY_TVSERIES_RECORD:
            return {
                ...state,
                records: [{...createEmptyRecord(), type: "tvseries"}, ...state.records],
                emptyRecord: {
                    ...state.emptyRecord,
                    isExists: true
                }
            };
        case ADD_RECORD:
            const id = action.payload;
            const tmdbRecord = find(state.emptyRecord.records, (record) => record.id === id);
            const newRecord = {
                id: tmdbRecord.id,
                viewdate: new Date(),
                posterpath: tmdbRecord.poster_path,
                title: tmdbRecord.title,
                releaseYear: tmdbRecord.release_date.substring(0, 4),
                originalTitle: tmdbRecord.original_title,
                director: 'Клинт Иствуд',
                genre: "боевик",
                flag: 'us',
                rating: '6',
                type: 'movie'
            };

            const newRecords = [newRecord];

            for (let i = 1; i < (state.records.length); i++) {
                newRecords.push(state.records[i]);
            }

            return {
                ...state,
                records: newRecords,
                emptyRecord: {
                    records: [],
                    isExists: false
                }
            };
        case UPDATE_RECORD:
            const recordIndex = findIndex(state.records, {id: action.payload.id});
            const updatedRecord = {
                ...state.records[recordIndex],
                ...action.payload
            };

            const updatedRecords = [...state.records];
            updatedRecords[recordIndex] = updatedRecord;

            return {
                ...state,
                records: updatedRecords
            };
        case POPULATE_AUTOSUGGEST_START:
            return {
                ...state,
            };
        case POPULATE_AUTOSUGGEST_SUCCESS:
            return {
                ...state,
                emptyRecord: {
                    ...state.emptyRecord,
                    records: action.payload.data.results
                }
            };
        case POPULATE_AUTOSUGGEST_FAILURE:
            return {
                ...state,
            };
        case GET_GENRES_START:
            return {
                ...state,
            };
        case GET_GENRES_SUCCESS:
            const genresDictionary = {};

            forEach(action.payload, (genreItem) => {
                genresDictionary[genreItem.id] = genreItem.name;
            });

            return {
                ...state,
                genresDictionary
            };
        case GET_GENRES_FAILURE:
            return {
                ...state,
            };
    }

    return state;
};
