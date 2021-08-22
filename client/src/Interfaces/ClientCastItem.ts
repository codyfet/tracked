import {ICastItem} from "../../../server/src/interfaces/CastItem";

export interface IClientCastItem extends ICastItem {
    _id?: string; // В момент создания экземпляра на фронте этого идентификатора еще нет.
    id: number;
}
