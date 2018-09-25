/* eslint no-proto: 0 */

export class NotAuthorizedError extends Error {
    constructor(response) {
        super('Ошибка авторизации');
        this.response = response;

        this.name = 'NotAuthorizedError';
        this.constructor = NotAuthorizedError;
        this.__proto__ = NotAuthorizedError.prototype;
    }
}

export class ForbiddenError extends Error {
    constructor(response) {
        super('Операция запрещена');
        this.response = response;

        this.name = 'ForbiddenError';
        this.constructor = ForbiddenError;
        this.__proto__ = ForbiddenError.prototype;
    }
}

export class UnknownError extends Error {
    constructor(response, message) {
        super(message || 'Неизвестная ошибка');
        this.response = response;

        this.name = 'UnknownError';
        this.constructor = UnknownError;
        this.__proto__ = UnknownError.prototype;
    }
}
