import {ICastItem} from "../../../server/src/interfaces/CastItem";

export interface IClientCastItem extends ICastItem {
    _id: string;
    id: number;
}
