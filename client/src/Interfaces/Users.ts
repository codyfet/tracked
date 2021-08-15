import {IUser} from "../../../server/src/interfaces/User";

export interface IClientUsers {
    items: IUser[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
}
