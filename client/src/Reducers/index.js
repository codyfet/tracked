import {combineReducers} from "redux";
import user from "./user";
import records from "./records";
import emptyRecord from "./emptyRecord";

export default combineReducers({
    user,
    records,
    emptyRecord
});
