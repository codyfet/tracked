import {IAsyncData, IErrorDataObject} from "../Interfaces/Common";
import {IClientUser} from "./../Interfaces/User";

export type IUserReduxState = IAsyncData<IClientUser, IErrorDataObject>;
