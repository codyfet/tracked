import React from "react";
import {Plus} from "./Icons/Plus";

interface IProps {
    onClick: () => void;
}

/**
 * Пустая карточка с плюсом.
 *
 * @param {Function} onClick Колбэк функция на нажатие мышью по карточке.
 */
export const EmptyCard = ({onClick}: IProps) => {
    return (
        <div className="card empty-card" onClick={onClick}>
            <Plus />
        </div>
    );
};
