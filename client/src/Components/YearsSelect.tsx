import React from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import {CURRENT_YEAR} from "../Consts";

/**
 * Формирует опции для выпадающего списка "Годы" от 2010 до текущего года.
 *
 * @param {boolean} showAllOption Признак отрисовки опции "Все года".
 */
const getBasicYearsOptions = (showAllOption: boolean): DropdownItemProps[] => {
    const options = showAllOption
        ? [
              {
                  key: "total",
                  value: 0,
                  text: "За всё время",
              },
          ]
        : [];

    for (let year = CURRENT_YEAR; year >= 2010; year--) {
        options.push({
            key: year.toString(),
            value: year,
            text: year.toString(),
        });
    }

    return options;
};

interface IProps {
    selectedYear: number;
    onSelect: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;
    showAllOption?: boolean;
}

/**
 * Компонент выпадающий список для поиска фильмов/сериалов в TMDb.
 * Единовременно может существовать только один на странице.
 *
 * @prop {number} selectedYear Выбранный год.
 * @prop {Function} onSelect Обработчик выбора значения в селекте.
 * @prop {boolean} showAllOption Признак отрисовки опции "Все".
 */
export const YearsSelect = ({selectedYear, onSelect, showAllOption}: IProps) => {
    const yearsOptions = getBasicYearsOptions(showAllOption);
    const selectedOption =
        yearsOptions.find((option) => option.value === selectedYear) || yearsOptions[0];

    return (
        <Dropdown inline options={yearsOptions} value={selectedOption.value} onChange={onSelect} />
    );
};
