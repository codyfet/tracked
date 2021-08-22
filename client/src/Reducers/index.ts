import {IStatReduxState} from "./stat.types";
import {IEmptyRecordTMDbItemsReduxState} from "./emptyRecordTMDbItems.types";
import {IRecordsReduxState} from "./records.types";
import {IUsersReduxState} from "./users.types";
import {IUserReduxState} from "./user.types";
import {Reducer, combineReducers} from "redux";
import user from "./user";
import users from "./users";
import records from "./records";
import emptyRecordTMDbItems from "./emptyRecordTMDbItems";
import stat from "./stat";

export interface IApplicationReduxState {
    user: IUserReduxState;
    users: IUsersReduxState;
    records: IRecordsReduxState;
    emptyRecordTMDbItems: IEmptyRecordTMDbItemsReduxState;
    stat: IStatReduxState;
}

const reducers: Reducer<IApplicationReduxState> = combineReducers({
    user,
    users,
    records,
    emptyRecordTMDbItems,
    stat,
});

export default reducers;
