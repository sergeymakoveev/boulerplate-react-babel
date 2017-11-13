import is from 'is_js';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import React from 'react';

import { default as _TextField } from 'material-ui/TextField';



export class TextField extends React.PureComponent {

    static propTypes = {
        input: PropTypes.any,
        label: PropTypes.string,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        })
    }

    render() {
        const { input, meta: { touched, error }, ...custom } = this.props;
        return (
            <_TextField
                {...input}
                {...custom}
                errorText={ touched && error }
            />
        );
    }

}

export const validators = {
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
            (v) => is.alphaNumeric(v)
                ? ''
                : 'Допустимы только буквенно-цифровые символы',
    },
    length: {
        min:
            (min) =>
            (value) => is.above(R.length(value), min-1)
                ? ''
                : `Длина не должна быть меньше ${min}`,
        max:
            (max) =>
            (value) => is.under(R.length(value), max+1)
                ? ''
                : `Длина не должна превышать ${max}`,
        within:
            (min, max) =>
            (value) => is.within(R.length(value), min, max)
                ? ''
                : `Длина должна находиться в диапазоне [${min} ... ${max}]`
    }
}
