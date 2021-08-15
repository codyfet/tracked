import {ERecordType} from "./../Enums";
import {IRecord} from "./../../../server/src/interfaces/Record";

export interface IClientRecord extends IRecord {
    isEmptyRecord: boolean;
    isSelected: boolean;
}

export type IPartialClientRecord = Partial<IClientRecord>;

export interface IClientRecordsFilter {
    sortBy: string;
    year: number;
    types: ERecordType[];
}
