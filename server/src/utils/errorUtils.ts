// /**
//  * Ошибка отсутсвия прав для выполнения запроса.
//  */
// function NotAuthorizedError(this: Error) {
//     this.name = "NotAuthorizedError";
//     this.message = "Нет прав для выполнения запроса";
//     this.stack = new Error().stack;
// }

// NotAuthorizedError.prototype = Object.create(Error.prototype);
// NotAuthorizedError.prototype.constructor = NotAuthorizedError;

// export {NotAuthorizedError};

declare class NotAuthorizedError extends Error {
    constructor();
}

function NotAuthorizedError() {
    const err = new Error();
    err.message = "Нет прав для выполнения запроса";
    err.name = "NotAuthorizedError";
    Object.setPrototypeOf(err, NotAuthorizedError.prototype);
    return err;
}

NotAuthorizedError.prototype = Object.create(Error.prototype, {
    name: {value: "Custom Error", enumerable: false},
});

export {NotAuthorizedError};
