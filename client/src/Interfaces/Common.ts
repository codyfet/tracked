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
    message: string;
    status?: number;
}

export interface ILocationState {
    errorMessage: string;
    prevLocation: string;
}
