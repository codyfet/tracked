import {IRecord} from "./../../../server/src/interfaces/Record";

export interface IClientRecord extends IRecord {
    isEmptyRecord: boolean;
    isSelected: boolean;
}
