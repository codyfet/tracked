import {filter} from 'lodash';
import {REMOVE_RECORD, ADD_RECORD} from "../Actions/ActionTypes";
import {createEmptyRecord} from '../Utils/Utils';

const initialState = {
    records: [
        {
            id: "1",
            viewdate: '20 апреля',
            posterpath: 'xxxxxxxx',
            title: 'Снайпер',
            releaseYear: '2014',
            originalTitle: 'American Sniper',
            director: 'Клинт Иствуд',
            flag: 'us',
            rating: '6',
        },
        {
            id: "2",
            viewdate: '18 апреля',
            posterpath: 'xxxxxxxx',
            title: 'Рэмбо: Последняя кровь',
            releaseYear: '2019',
            originalTitle: 'Rambo: Last Blood',
            director: 'Адриан Грюнберг',
            flag: 'us',
            rating: '6',
        }
    ]
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
        case ADD_RECORD:
            return {
                ...state,
                records: [createEmptyRecord(), ...state.records]
            }
    }

    return state;
};
