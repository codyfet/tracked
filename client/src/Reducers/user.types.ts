import {IAsyncData} from "../Interfaces/Common";
import {IClientUser, IUserErrorObject} from "./../Interfaces/User";

export type IUserReduxState = IAsyncData<IClientUser, IUserErrorObject>;
