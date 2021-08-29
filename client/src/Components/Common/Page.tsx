import React, {ReactElement} from "react";
import {LoadingOverlay} from "./LoadingOverlay";

interface IProps {
    isLoading: boolean;
    errorMessage: string;
    children: ReactElement;
}

/**
 * Компонент-обёртка для страниц приложения.
 * Содержит реализацию спиннера для предзагрузок страницы.
 *
 * @prop {Array<string>} asyncDataKeys Массив ключей контейнеров данных из редакс дерева, для которых нужно проверить статус загрузки.
 */
export const Page: React.FunctionComponent<IProps> = ({
    isLoading,
    errorMessage,
    children,
}: IProps) =>
    isLoading ? <LoadingOverlay /> : errorMessage ? <div>{errorMessage}</div> : children;
