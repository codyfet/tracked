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
    "Декабря"
];

/**
 * Возвращает дату в формате "06 Апреля".
 *
 * @param {Date} dateObject Дата в формате Date.
 */
export function getFormattedDate (dateObject) {
    const month = MONTH_NAMES[dateObject.getMonth()];
    const day = String(dateObject.getDate()).padStart(2, "0").replace(/^0+/, "");

    return `${day} ${month}`;
}
