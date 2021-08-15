import {ICrewItem} from "../../../server/src/interfaces/CrewItem";

export interface IClientCrewItem extends ICrewItem {
    _id: string;
    id: number;
}
