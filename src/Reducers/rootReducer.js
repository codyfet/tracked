import {filter, find, findIndex, map} from "lodash";
import {
    ADD_EMPTY_MOVIE_RECORD,
    ADD_EMPTY_TVSERIES_RECORD,
    ADD_MOVIE_DETAILED_RECORD_SUCCESS,
    ADD_TVSERIES_DETAILED_RECORD_SUCCESS,
    ORDER_RECORDS_BY,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
    REMOVE_RECORD,
    UPDATE_RECORD
} from "../Actions/ActionTypes";
import {createEmptyRecord} from "../Utils/Utils";

const initialState = {
    records: [],
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
                records: filter(state.records, (record) => record.id !== action.payload.id),
                emptyRecord: {
                    records: [],
                    isExists: false
                }
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
        case ADD_MOVIE_DETAILED_RECORD_SUCCESS: {
            const details = action.payload[0].data;
            const credits = action.payload[1].data;
            const tmdbRecord = find(state.emptyRecord.records, (record) => record.id === details.id);
            const newRecord = {
                id: tmdbRecord.id, // этот id не уникальный
                viewdate: new Date(),
                posterpath: tmdbRecord.poster_path,
                title: tmdbRecord.title,
                releaseYear: tmdbRecord.release_date.substring(0, 4),
                originalTitle: tmdbRecord.original_title,
                rating: "0",
                type: "movie",
                backdrop_path: details.backdrop_path,
                genres: details.genres,
                overview: details.overview,
                production_countries: map(details.production_countries, (item) => item.iso_3166_1),
                director: [find(credits.crew, (crewItem) => crewItem.job === "Director")?.name],
                reViewed: false,
                notFinished: false,

                cast: credits.cast,
                crew: credits.crew,
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
        }
        case ADD_TVSERIES_DETAILED_RECORD_SUCCESS: {
            const details = action.payload.data;
            const tmdbRecord = find(state.emptyRecord.records, (record) => record.id === details.id);
            const newRecord = {
                id: tmdbRecord.id,
                viewdate: new Date(),
                posterpath: tmdbRecord.poster_path,
                title: tmdbRecord.name,
                releaseYear: tmdbRecord.first_air_date.substring(0, 4),
                originalTitle: tmdbRecord.original_name,
                rating: "0",
                type: "tvseries",
                backdrop_path: details.backdrop_path,
                genres: details.genres,
                overview: details.overview,
                production_countries: details.origin_country,
                director: map(details.created_by, (p) => p.name),
                reViewed: false,
                notFinished: false,

                season: "1",
                inProduction: details.in_production,
                numberOfSeasons: details.number_of_seasons
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
        }
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
        case ORDER_RECORDS_BY:
            const by = action.payload;
            let sortedRecords = null;

            if (by === "viewdate") {
                sortedRecords = state.records.slice().sort((a, b) => b.viewdate - a.viewdate);
            }

            return {
                ...state,
                records: sortedRecords
            };
        case POPULATE_MOVIES_AUTOSUGGEST_START:
            return {
                ...state,
            };
        case POPULATE_MOVIES_AUTOSUGGEST_SUCCESS:
            return {
                ...state,
                emptyRecord: {
                    ...state.emptyRecord,
                    records: action.payload.data.results
                }
            };
        case POPULATE_MOVIES_AUTOSUGGEST_FAILURE:
            return {
                ...state,
            };
        case POPULATE_TV_AUTOSUGGEST_START:
            return {
                ...state,
            };
        case POPULATE_TV_AUTOSUGGEST_SUCCESS:
            return {
                ...state,
                emptyRecord: {
                    ...state.emptyRecord,
                    records: action.payload.data.results
                }
            };
        case POPULATE_TV_AUTOSUGGEST_FAILURE:
            return {
                ...state,
            };
    }

    return state;
};
