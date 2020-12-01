import React from "react";

/**
 * Пустая карточка с плюсом.
 *
 * @param {Function} onClick Колбэк функция на нажатие мышью по карточке.
 */
export const EmptyCard = ({onClick}) => {
    return (
        <div className="card empty-card" onClick={onClick}>
            <svg className="plus" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 11.25V42.75" stroke="#DFDFE4" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.25 27H42.75" stroke="#DFDFE4" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
};
