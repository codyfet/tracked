import {useState} from "react";

/**
 * Хук для реализации механизма изменения значения поля формы одновременно с изменение данных в БД.
 *
 * @param {boolean} initialValue Стартовое значение поля.
 * @param {Function} updateAction Коллбэк (редакс экшн, обновляющий значение).
 */
export const useUpdate = <T>(initialValue: T, updateAction: (newValue: T) => void) => {
    const [value, setValue] = useState(initialValue);

    const update = (newValue: T) => {
        setValue(newValue);
        updateAction(newValue);
    };

    return [value, update];
};
