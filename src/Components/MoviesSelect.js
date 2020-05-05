import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Autosuggest from 'react-autosuggest';
import {noop} from 'lodash';
import {searchMovies} from '../Actions/Actions';

/**
 * Компонент выпадающий список для поиска фильмов.
 */
export const MoviesSelect = () => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.editableRecord.records);
    const [editableRecordInputValue, setEditableRecordInputValue] = useState('');

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
        <div>
            {suggestion.title}
        </div>
    );

    /**
     * Обрботчик изменения в инпут-поле.
     */
    const handleChangeInput = (event) => {
        const inputValue = event.target.value;

        setEditableRecordInputValue(inputValue);

        if (inputValue.length > 2) {
            dispatch(searchMovies(inputValue));
        }
    }

    /**
     * Настройки для инпута.
     */
    const inputProps = {
        placeholder: 'Найти фильм...',
        value: editableRecordInputValue,
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
