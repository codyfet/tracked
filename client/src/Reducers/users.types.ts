import {IAsyncData, IErrorDataObject} from "../Interfaces/Common";
import {IClientUsers} from "../Interfaces/Users";

export type IUsersReduxState = IAsyncData<IClientUsers, IErrorDataObject>;
