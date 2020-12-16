import React from "react";
import {useSelector} from "react-redux";
import {LoadingOverlay} from "./LoadingOverlay";

/**
 * Компонент-обёртка для страниц приложения.
 * Содержит реализацию спиннера для предзагрузок страницы.
 *
 * @prop {Array<string>} asyncDataKeys Массив ключей контейнеров данных из редакс дерева, для которых нужно проверить статус загрузки.
 */
export const Page = (props) => {
    const state = useSelector(state => state);
    const keys = props.asyncDataKeys;

    for (let i = 0; i < keys.length; i++) {
        const {isLoading} = state[keys[i]];

        if (isLoading) {
            return <LoadingOverlay />;
        }
    }

    return React.cloneElement(props.children, {...props});
};
