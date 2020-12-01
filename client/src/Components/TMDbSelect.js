import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Autosuggest from "react-autosuggest";
import {noop} from "lodash";

/**
 * Компонент выпадающий список для поиска фильмов/сериалов в TMDb.
 * Единовременно может существовать только один на странице.
 */
export const TMDbSelect = ({searchAction, onSuggestionSelected, titlePropName, releasePropName, placeholder}) => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.emptyRecordTMDbItems);
    const user = useSelector(state => state.user);
    const userId = user.data?.userId;
    const [emptyRecordInputValue, setEmptyRecordInputValue] = useState("");

    /**
     * Вычисляет значение для опции.
     *
     * @param {Object} suggestion Предложение.
     */
    const getSuggestionValue = (suggestion) => suggestion[titlePropName];

    /**
     * Рисует опцию с предложением.
     *
     * @param {Object} suggestion Предложение.
     */
    const renderSuggestion = (suggestion) => {
        const year = suggestion[releasePropName] ? `(${suggestion[releasePropName]?.substring(0, 4)})` : "";

        return (
            <div className="suggestion-item" id={suggestion.id}>
                {suggestion[titlePropName] + " " + year}
            </div>
        );
    };

    /**
     * Обработчик изменения в инпут-поле.
     */
    const handleChangeInput = (event, options) => {
        // Если обработчик вызван из-за ввода значения руками.
        if (options.method === "type") {
            const inputValue = event.target.value;
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
    const handleSuggestionSelected = (_event, {suggestion}) => {
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
        autoFocus: true
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
