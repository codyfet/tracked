import React from "react";
import {Dropdown} from "semantic-ui-react";
import {map} from "lodash";

/**
 * Формирует опции для выпадающего списка "Годы".
 *
 * @param {string[]} years Массив лет.
 * @param {boolean} showAllOption Признак отрисовки опции "Все года".
 */
const getYearsOptions = (years = [], showAllOption) => {
    const options = showAllOption ? [{
        key: "total",
        value: "total",
        text: "За всё время"
    }] : [];

    options.push(...map(years, (year) => ({key: year, value: year, text: year})));
    return options;
};

/**
 * Компонент выпадающий список для поиска фильмов/сериалов в TMDb.
 * Единовременно может существовать только один на странице.
 *
 * @prop {string[]} years Массив лет.
 */
export const YearsSelect = ({years, onSelect, showAllOption}) => {
    const yearsOptions = getYearsOptions(years, showAllOption);

    const handleSelect = () => {
        onSelect();
    };

    return (
        <Dropdown
            inline
            options={yearsOptions}
            defaultValue={yearsOptions[0].value}
            onChange={handleSelect}
        />
    );
};
