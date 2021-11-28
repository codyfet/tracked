"use strict";
// /**
//  * Ошибка отсутсвия прав для выполнения запроса.
//  */
// function NotAuthorizedError(this: Error) {
//     this.name = "NotAuthorizedError";
//     this.message = "Нет прав для выполнения запроса";
//     this.stack = new Error().stack;
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
function NotAuthorizedError() {
    const err = new Error();
    err.message = "Нет прав для выполнения запроса";
    err.name = "NotAuthorizedError";
    Object.setPrototypeOf(err, NotAuthorizedError.prototype);
    return err;
}
exports.NotAuthorizedError = NotAuthorizedError;
NotAuthorizedError.prototype = Object.create(Error.prototype, {
    name: { value: "Custom Error", enumerable: false },
});
