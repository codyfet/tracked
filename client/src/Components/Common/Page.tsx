import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {IApplicationReduxState} from "../../Reducers";
import {ErrorMessage} from "../ErrorMessage";
import {LoadingOverlay} from "./LoadingOverlay";

interface IProps {
    isLoading: boolean;
    errorMessage: string;
    children: () => ReactElement;
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
}: IProps) => {
    const {
        user: {isLoading: isUserLoading},
    } = useSelector((state: IApplicationReduxState) => state);

    return isLoading || isUserLoading ? (
        <LoadingOverlay />
    ) : errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
    ) : (
        children()
    );
};
