import {filter, find} from 'lodash';
import {REMOVE_RECORD, ADD_EMPTY_RECORD, ADD_RECORD, POPULATE_AUTOSUGGEST_START, POPULATE_AUTOSUGGEST_SUCCESS, POPULATE_AUTOSUGGEST_FAILURE} from "../Actions/ActionTypes";
import {createEmptyRecord} from '../Utils/Utils';
import {getFormattedDate} from '../Utils/DateUtils';

const initialState = {
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
            }
        case ADD_EMPTY_RECORD:
            return {
                ...state,
                records: [createEmptyRecord(action.payload), ...state.records]
            }
        case ADD_RECORD:
            const id = action.payload;
            const tmdbRecord = find(state.emptyRecord.records, (record) => record.id.toString() === id);
            const newRecord = {
                id: tmdbRecord.id,
                viewdate: getFormattedDate(new Date()),
                posterpath: tmdbRecord.poster_path,
                title: tmdbRecord.title,
                releaseYear: tmdbRecord.release_date.substring(0, 4),
                originalTitle: tmdbRecord.original_title,
                director: 'Клинт Иствуд',
                genre: "боевик",
                flag: 'us',
                rating: '6',
                type: 'movie'
            }

            const newRecords = [newRecord];

            for (let i = 1; i < (state.records.length); i++) {
                newRecords.push(state.records[i]);
            }

            return {
                ...state,
                records: newRecords
            }
        case POPULATE_AUTOSUGGEST_START:
            return {
                ...state,
            }
        case POPULATE_AUTOSUGGEST_SUCCESS:
            return {
                ...state,
                emptyRecord: {
                    records: action.payload.data.results
                }
            }
        case POPULATE_AUTOSUGGEST_FAILURE:
            return {
                ...state,
            }
    }

    return state;
};
