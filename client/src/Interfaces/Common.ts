export interface IAsyncData<T, E = Object> {
    data: T;
    isLoading: boolean;
    error: E;
}

export interface IFSAAction<P> {
    type: string;
    payload?: P;
}
