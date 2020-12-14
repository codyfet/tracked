/**
 * Ошибка отсутсвия прав для выполнения запроса.
 */
function NotAuthorizedError() {
    this.name = 'NotAuthorizedError';
    this.message = 'Нет прав для выполнения запроса';
    this.stack = (new Error()).stack;
}

NotAuthorizedError.prototype = Object.create(Error.prototype);
NotAuthorizedError.prototype.constructor = NotAuthorizedError;

module.exports = {
    NotAuthorizedError
}
