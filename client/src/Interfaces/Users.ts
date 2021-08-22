import {IClientUser} from "./User";

export interface IClientUsers {
    items: IClientUser[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    records: string[];
    // favouriteMovies[]
}
