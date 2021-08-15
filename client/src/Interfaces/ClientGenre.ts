import {IGenre} from "../../../server/src/interfaces/Genre";

export interface IClientGenre extends IGenre {
    _id: string;
    id: number;
}
