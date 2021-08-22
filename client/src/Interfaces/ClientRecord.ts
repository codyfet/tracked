import {ERecordType} from "../Enums";
import {IRecord} from "../../../server/src/interfaces/Record";
import {IClientCastItem} from "./ClientCastItem";
import {IClientCrewItem} from "./ClientCrewItem";
import {IClientGenre} from "./ClientGenre";

export interface IClientRecord extends IRecord {
    _id?: string;
    id: number;
    cast?: IClientCastItem[];
    crew?: IClientCrewItem[];
    genres: IClientGenre[];

    isEmptyRecord?: boolean;
    isSelected?: boolean;
}

export type IPartialClientRecord = Partial<IClientRecord>;

export interface IClientRecordsFilter {
    sortBy: string;
    year: number;
    types: ERecordType[];
}
