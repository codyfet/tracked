/**
 * Объект с ошибкой, который присылает с сервера middleware errorHandler.
 */
export interface IErrorResponse {
    message: string;
    stack: string;
}
