import {IAsyncData, IErrorDataObject} from "../Interfaces/Common";
import {IStat} from "../Interfaces/Stat";

export type IStatReduxState = IAsyncData<IStat, IErrorDataObject>;
