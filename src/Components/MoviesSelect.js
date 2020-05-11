import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Autosuggest from "react-autosuggest";
import {noop} from "lodash";
import {addDetailedRecord, searchMovies} from "../Actions/Actions";
import debounceAction from "debounce-action";

/**
 * Асинхронный Thunk, обернутый в debounce, чтобы не слать лишние запросы после нескольких нажатий клавиш подряд.
 */
const debouncedSearchMovies = debounceAction(searchMovies, 300, {leading: true});

/**
 * Компонент выпадающий список для поиска фильмов.
 */
export const MoviesSelect = () => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.emptyRecord.records);
    const [emptyRecordInputValue, setEmptyRecordInputValue] = useState("");

    /**
     * Вычисляет значение для опции.
     *
     * @param {Object} suggestion Предложение.
     */
    const getSuggestionValue = (suggestion) => suggestion.title;

    /**
     * Рисует опцию с предложением.
     *
     * @param {Object} suggestion Предложение.
     */
    const renderSuggestion = (suggestion) => {
        const year = suggestion.release_date ? `(${suggestion.release_date?.substring(0, 4)})` : "";

        return (
            <div className="suggestion-item" id={suggestion.id}>
                {suggestion.title + " " + year}
            </div>
        );
    };

    /**
     * Обрботчик изменения в инпут-поле.
     */
    const handleChangeInput = (event, options) => {
        // Если обработчик вызван из-за ввода значения руками.
        if (options.method === "type") {
            const inputValue = event.target.value;
            setEmptyRecordInputValue(inputValue);
            // Ищем фильмы в БД для наполнения ими выпадающего списка.
            if (inputValue.length > 2) {
                dispatch(debouncedSearchMovies(inputValue));
            }
        }
    };

    const handleSuggestionSelected = (event, {suggestion}) => {
        setEmptyRecordInputValue(suggestion.title);
        // Добавляем запись с выбранным фильмом.
        dispatch(addDetailedRecord(suggestion.id));
    };

    /**
     * Настройки для инпута.
     */
    const inputProps = {
        placeholder: "Найти фильм...",
        value: emptyRecordInputValue,
        onChange: handleChangeInput
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
        />
    );
};
