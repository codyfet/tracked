import {useState} from "react";

/**
 * Хук для реализации механизма переключателя.
 *
 * @param {boolean} initialValue Стартовое значение переключателя.
 */
export const useToggle = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue(!value);

    return [value, toggle];
};
