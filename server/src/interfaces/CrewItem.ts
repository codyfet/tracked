import {Document} from "mongoose";

export interface ICrewItem extends Document {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: string;
}
