import {combineReducers} from "redux";
import user from "./user";
import users from "./users";
import records from "./records";
import emptyRecordTMDbItems from "./emptyRecordTMDbItems";
import stat from "./stat";

export default combineReducers({
    user,
    users,
    records,
    emptyRecordTMDbItems,
    stat,
});
