import PropTypes from 'prop-types';
import React from 'react';

import { Field } from 'react-final-form';
import MUITextField from '@material-ui/core/TextField';

import { PropTypesTextField } from 'proptypes';


const _TextField = ({
    render,
    meta: { touched, error },
    input: { name, value, ...inputProps },
    ...custom
}) => (
    <MUITextField
        {...inputProps}
        {...custom}
        name={name}
        value={value}
        error={Boolean(touched && error)}
        helperText={touched && error}
    />
);

_TextField.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
    }),
    render: PropTypes.func,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
};

export const TextField = ({
    label, name, validate,
}) => (
    <Field
        component={_TextField}
        name={name}
        label={label}
        validate={validate}
    />
);
TextField.propTypes = PropTypesTextField;

export const PasswordField = ({
    label, name, validate,
}) => (
    <Field
        component={_TextField}
        name={name}
        label={label}
        type="password"
        validate={validate}
    />
);
PasswordField.propTypes = PropTypesTextField;
