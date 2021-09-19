import {IFavouriteMovie} from "../../../server/src/interfaces/FavouriteMovie";

export interface IClientFavouriteMovie extends IFavouriteMovie {
    _id?: string; // В момент создания экземпляра на фронте этого идентификатора еще нет.
}
