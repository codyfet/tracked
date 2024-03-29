const MONTH_NAMES = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
];

/**
 * Возвращает дату в формате "06 Апреля".
 *
 * @param {Date} dateObject Дата в формате Date.
 */
export function getFormattedDate(dateObject: Date): string {
    const month = MONTH_NAMES[dateObject.getMonth()];
    const day = String(dateObject.getDate()).padStart(2, "0").replace(/^0+/, "");

    return `${day} ${month}`;
}

/**
 * Возвращает сегодняшнюю дату в формате Date с установленным значением времени 00:00:00
 *
 * Пример: Sat Aug 21 2021 00:00:00 GMT+0300 (Москва, стандартное время)
 */
export function getEmptyTodayDate(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}
