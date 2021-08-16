import {ValidationError} from "express-validator";

export interface IAsyncData<T, E = Object> {
    data: T;
    isLoading: boolean;
    error: E;
}

export interface IFSAAction<P> {
    type: string;
    payload?: P;
}

export interface IErrorDataObject {
    errors?: ValidationError[];
    message: string;
    status?: number;
}
