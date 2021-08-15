import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {IApplicationReduxState} from "../../Reducers";
import {LoadingOverlay} from "./LoadingOverlay";

interface IProps {
    asyncDataKeys: string[];
    children: ReactElement;
}

/**
 * Компонент-обёртка для страниц приложения.
 * Содержит реализацию спиннера для предзагрузок страницы.
 *
 * @prop {Array<string>} asyncDataKeys Массив ключей контейнеров данных из редакс дерева, для которых нужно проверить статус загрузки.
 */
export const Page: React.FunctionComponent<IProps> = (props: IProps) => {
    const state = useSelector((state: IApplicationReduxState) => state);
    const keys = props.asyncDataKeys;

    for (let i = 0; i < keys.length; i++) {
        const {isLoading, data} = state[keys[i]];

        if (!data && isLoading) {
            return <LoadingOverlay />;
        }
    }

    return React.cloneElement(props.children, {...props});
};
