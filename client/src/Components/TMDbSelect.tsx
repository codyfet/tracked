import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Autosuggest, {ChangeEvent, SuggestionSelectedEventData} from "react-autosuggest";
import {noop} from "lodash";
import {IApplicationReduxState} from "../Reducers";
import {ResultMovie, ResultTVSeries} from "../Interfaces/TMDBInterfaces";

type Result = ResultMovie & ResultTVSeries;

export interface ITMDbSelectProps {
    searchAction: (inputValue: string) => void;
    onSuggestionSelected: (suggestion: Result, userId: string) => void;
    titlePropName: "title" | "name";
    releasePropName: "release_date" | "first_air_date";
    placeholder: string;
}

/**
 * Компонент выпадающий список для поиска фильмов/сериалов в TMDb.
 * Единовременно может существовать только один на странице.
 */
export const TMDbSelect = ({
    searchAction,
    onSuggestionSelected,
    titlePropName,
    releasePropName,
    placeholder,
}: ITMDbSelectProps) => {
    const dispatch = useDispatch();
    const records = useSelector((state: IApplicationReduxState) => state.emptyRecordTMDbItems);
    const user = useSelector((state: IApplicationReduxState) => state.user);
    const userId = user.data?.userId;
    const [emptyRecordInputValue, setEmptyRecordInputValue] = useState("");

    /**
     * Вычисляет значение для опции.
     *
     * @param {Object} suggestion Предложение.
     */
    const getSuggestionValue = (suggestion: Result) => suggestion[titlePropName];

    /**
     * Рисует опцию с предложением.
     *
     * @param {Object} suggestion Предложение.
     */
    const renderSuggestion = (suggestion: Result) => {
        const year = suggestion[releasePropName]
            ? `(${suggestion[releasePropName]?.substring(0, 4)})`
            : "";

        return (
            <div className="suggestion-item" id={suggestion.id.toString()}>
                {suggestion[titlePropName] + " " + year}
            </div>
        );
    };

    /**
     * Обработчик изменения в инпут-поле.
     */
    const handleChangeInput = (event: React.FormEvent<HTMLElement>, options: ChangeEvent) => {
        // Если обработчик вызван из-за ввода значения руками.
        if (options.method === "type") {
            const inputValue = (event.target as HTMLInputElement).value;
            setEmptyRecordInputValue(inputValue);
            // Ищем фильмы в БД для наполнения ими выпадающего списка.
            if (inputValue.length > 2) {
                dispatch(searchAction(inputValue));
            }
        }
    };

    /**
     * Обработчик выбора значения в выпадающем списке.
     * @param {Event} _event Событие.
     * @param {{suggestion}} param Выбранное значение.
     */
    const handleSuggestionSelected = (
        _event: React.FormEvent,
        {suggestion}: SuggestionSelectedEventData<Result>
    ) => {
        setEmptyRecordInputValue(suggestion[titlePropName]);
        onSuggestionSelected(suggestion, userId);
    };

    /**
     * Настройки для инпута.
     */
    const inputProps = {
        placeholder,
        value: emptyRecordInputValue,
        onChange: handleChangeInput,
        autoFocus: true,
    };

    return (
        <Autosuggest
            onSuggestionsFetchRequested={noop}
            onSuggestionsClearRequested={noop}
            onSuggestionSelected={handleSuggestionSelected}
            suggestions={records}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            multiSection={null}
        />
    );
};
