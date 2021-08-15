export interface IAsyncData<T> {
    data: T;
    isLoading: boolean;
    error: Object;
}

export interface IFSAAction<P> {
    type: string;
    payload?: P;
}
