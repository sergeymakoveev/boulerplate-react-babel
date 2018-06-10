import * as R from 'ramda';
import is from 'is_js';


const validators = {
    pipe: (...args) =>
        R.converge(
            (...results) => R.pipe(
                R.reject(R.not),
                R.head
            )(results),
            args
        ),
    required: (v) => R.isNil(v) ? 'Обязательное поле' : '',
    is: {
        email:
            (v) => is.email(v)
                ? ''
                : 'Введите email',
        alphanumeric:
            (v) => (/^[0-9a-z.\- ]+$/i).test(v)
                ? ''
                : 'Допустимы только буквенно-цифровые символы на латинице',
        cyralphanumeric:
            (v) => (/^[0-9a-zа-я.\- ]+$/i).test(v)
                ? ''
                : 'Допустимы только буквенно-цифровые символы',
    },
    has: {
        nospace:
            (v) => (/\s/).test(v)
                ? 'Пробельные символы не допустимы'
                : '',
    },
    length: {
        min:
            (min) =>
                (value) => is.above(R.length(value), min - 1)
                    ? ''
                    : `Длина не должна быть меньше ${min}`,
        max:
            (max) =>
                (value) => is.under(R.length(value), max + 1)
                    ? ''
                    : `Длина не должна превышать ${max}`,
        within:
            (min, max) =>
                (value) => is.within(R.length(value), min, max)
                    ? ''
                    : `Длина должна находиться в диапазоне [${min} ... ${max}]`
    }
}

export default validators;
