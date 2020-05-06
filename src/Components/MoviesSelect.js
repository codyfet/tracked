import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Autosuggest from 'react-autosuggest';
import {noop} from 'lodash';
import {searchMovies} from '../Actions/Actions';
import {ADD_RECORD} from '../Actions/ActionTypes';

/**
 * Компонент выпадающий список для поиска фильмов.
 */
export const MoviesSelect = () => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.emptyRecord.records);
    const [emptyRecordInputValue, setEmptyRecordInputValue] = useState('');

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
    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item" id={suggestion.id}>
            {suggestion.title}
        </div>
    );

    /**
     * Обрботчик изменения в инпут-поле.
     */
    const handleChangeInput = (event, options) => {
        let inputValue = null;
        // Если обработчик вызван из-за ввода значения руками.
        if (options.method === 'type') {
            inputValue = event.target.value;
            // Ищем фильмы в БД для наполнения ими выпадающего списка.
            if (inputValue.length > 2) {
                dispatch(searchMovies(inputValue));
            }
        // Если обработчик вызван из-за выбора в выпадающем списке.
        } else {
            inputValue = event.target.innerText;
            // Добавляем запись с выбранным фильмом.
            dispatch({type: ADD_RECORD, payload: event.target.id})
        }

        setEmptyRecordInputValue(inputValue);
    }

    /**
     * Настройки для инпута.
     */
    const inputProps = {
        placeholder: 'Найти фильм...',
        value: emptyRecordInputValue,
        onChange: handleChangeInput
    };

    return (
        <Autosuggest
            onSuggestionsFetchRequested={noop}
            onSuggestionsClearRequested={noop}
            suggestions={records}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
};
