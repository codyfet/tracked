import {IUser} from "../../../server/src/interfaces/User";

export interface IClientUsers {
    items: IUser[];
    total: boolean;
    page: boolean;
    limit: number;
    hasNext: boolean;
}
