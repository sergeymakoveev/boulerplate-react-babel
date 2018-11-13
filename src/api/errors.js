/* eslint no-proto: 0 */

export class ErrorNotAuthorized extends Error {
    constructor(response) {
        super('Ошибка авторизации');
        this.response = response;
        this.name = 'ErrorNotAuthorized';
        this.constructor = ErrorNotAuthorized;
        this.__proto__ = ErrorNotAuthorized.prototype;
    }
}

export class ErrorForbidden extends Error {
    constructor(response) {
        super('Операция запрещена');
        this.response = response;
        this.name = 'ErrorForbidden';
        this.constructor = ErrorForbidden;
        this.__proto__ = ErrorForbidden.prototype;
    }
}

export class ErrorBadRequest extends Error {
    constructor(response) {
        super('Некорректный запрос');
        this.response = response;
        this.name = 'ErrorBadRequest';
        this.constructor = ErrorBadRequest;
        this.__proto__ = ErrorBadRequest.prototype;
    }
}

export class ErrorBackend extends Error {
    constructor(response) {
        super('Ошибка сервера');
        this.response = response;
        this.name = 'ErrorBackend';
        this.constructor = ErrorBackend;
        this.__proto__ = ErrorBackend.prototype;
    }
}

export class ErrorUnknown extends Error {
    constructor(response, message) {
        super(message || 'Неизвестная ошибка');
        this.response = response;
        this.name = 'ErrorUnknown';
        this.constructor = ErrorUnknown;
        this.__proto__ = ErrorUnknown.prototype;
    }
}

export default {
    BadRequest: ErrorBadRequest,
    Backend: ErrorBackend,
    Forbidden: ErrorForbidden,
    NotAuthorized: ErrorNotAuthorized,
    Unknown: ErrorUnknown,
};
