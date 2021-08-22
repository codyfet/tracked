import {IGenre} from "../../../server/src/interfaces/Genre";

export interface IClientGenre extends IGenre {
    _id?: string; // В момент создания экземпляра на фронте этого идентификатора еще нет.
    id: number;
}
