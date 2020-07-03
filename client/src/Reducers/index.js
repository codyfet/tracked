import {combineReducers} from "redux";
import user from "./user";
import records from "./records";
import emptyRecordTMDbItems from "./emptyRecordTMDbItems";
import stat from "./stat";

export default combineReducers({
    user,
    records,
    emptyRecordTMDbItems,
    stat
});
