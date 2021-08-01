import {Document} from "mongoose";

export interface IGenre extends Document {
    id: number;
    name: string;
}
