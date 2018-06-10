import fp from 'lodash/fp';
import is from 'is_js';


export const validators = {
    pipe:
        (...args) =>
            (v) => (
                args.map(arg => arg(v))
                    .filter(v => !!v)
                    .shift()
            ),
    required:
        (v) => (
            fp.isNil(v)
                ? 'Обязательное поле'
                : undefined
        ),
    is: {
        email:
            (v) => is.email(v)
                ? undefined
                : 'Введите email',
        alphanumeric:
            (v) => (/^[0-9a-z.\- ]+$/i).test(v)
                ? undefined
                : 'Допустимы только буквенно-цифровые символы на латинице',
        cyralphanumeric:
            (v) => (/^[0-9a-zа-я.\- ]+$/i).test(v)
                ? undefined
                : 'Допустимы только буквенно-цифровые символы',
    },
    eq:
        (sample) =>
            (v) => (
                sample === v
                    ? undefined
                    : 'Значения не совпадают'
            ),
    has: {
        nospace:
            (v) => (/\s/).test(v)
                ? 'Пробельные символы не допустимы'
                : undefined,
    },
    length: {
        min:
            (min) =>
                (value) => is.above(fp.size(value), min - 1)
                    ? undefined
                    : `Длина не должна быть меньше ${min}`,
        max:
            (max) =>
                (value) => is.under(fp.size(value), max + 1)
                    ? undefined
                    : `Длина не должна превышать ${max}`,
        within:
            (min, max) =>
                (value) => is.within(fp.size(value), min, max)
                    ? undefined
                    : `Длина должна находиться в диапазоне [${min} ... ${max}]`,
    },
};

export default validators;
