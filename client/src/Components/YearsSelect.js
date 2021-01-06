import React from "react";
import {Dropdown} from "semantic-ui-react";
import {map} from "lodash";
import {CURRENT_YEAR} from "./../Consts";

/**
 * Формирует опции для выпадающего списка "Годы" от 2010 до текущего года.
 *
 * @param {boolean} showAllOption Признак отрисовки опции "Все года".
 */
const getBasicYearsOptions = (showAllOption) => {
    const options = showAllOption ? [{
        key: "total",
        value: 0,
        text: "За всё время"
    }] : [];

    for (let year = CURRENT_YEAR; year >= 2010; year--) {
        options.push({
            key: year,
            value: year,
            text: year
        });
    }

    return options;
};

/**
 * Компонент выпадающий список для поиска фильмов/сериалов в TMDb.
 * Единовременно может существовать только один на странице.
 *
 * @prop {string} selectedYear Выбранный год.
 * @prop {Function} onSelect Обработчик выбора значения в селекте.
 * @prop {boolean} showAllOption Признак отрисовки опции "Все".
 */
export const YearsSelect = ({selectedYear, onSelect, showAllOption}) => {
    const yearsOptions = getBasicYearsOptions(showAllOption);
    const selectedOption = yearsOptions.find((option) => option.value === selectedYear) || yearsOptions[0];

    return (
        <Dropdown
            inline
            options={yearsOptions}
            defaultValue={yearsOptions[yearsOptions.length - 1].value}
            value={selectedOption.value}
            onChange={onSelect}
        />
    );
};
