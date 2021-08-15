import {IAsyncData} from "../Interfaces/Common";
import {IClientRecord} from "../Interfaces/ClientRecord";

export type IRecordsReduxState = IAsyncData<IClientRecord[]>;
