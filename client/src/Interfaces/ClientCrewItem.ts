import {ICrewItem} from "../../../server/src/interfaces/CrewItem";

export interface IClientCrewItem extends ICrewItem {
    _id?: string; // В момент создания экземпляра на фронте этого идентификатора еще нет.
    id: number;
}
