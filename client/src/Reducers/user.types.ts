import {IAsyncData} from "../Interfaces/Common";
import {IClientUser, IUserErrorDataObject} from "./../Interfaces/User";

export type IUserReduxState = IAsyncData<IClientUser, IUserErrorDataObject>;
