import PropTypes from 'prop-types';
import React from 'react';

import { Field } from 'react-final-form';
// import MUIFormHelperText from '@material-ui/core/FormHelperText';
// import MUIFormControl from '@material-ui/core/FormControl';
// import MUIInput from '@material-ui/core/Input';
// import MUIInputLabel from '@material-ui/core/InputLabel';
// import MUIMenuItem from '@material-ui/core/MenuItem';
// import MUISelect from '@material-ui/core/Select';
import MUISwitch from '@material-ui/core/Switch';
import MUITextField from '@material-ui/core/TextField';

import { PropTypesTextField } from '~/proptypes';

/*
const _Select = ({
    render,
    meta: { touched, error },
    input: { name, value, ...inputProps },
    ...custom
}) => (
    <MUIFormControl>
        <MUIInputLabel htmlFor="age-helper">Age</MUIInputLabel>
        <MUISelect
            value={this.state.age}
            onChange={this.handleChange}
            input={<MUIInput name="age" id="age-helper" />}
        >
            <MUIMenuItem value={10}>Ten</MUIMenuItem>
            <MUIMenuItem value={20}>Twenty</MUIMenuItem>
            <MUIMenuItem value={30}>Thirty</MUIMenuItem>
        </MUISelect>
        <MUIFormHelperText>Some important helper text</MUIFormHelperText>
    </MUIFormControl>
);
*/

const _Switch = ({
    render,
    meta,
    input: { name, value, ...inputProps },
    ...custom
}) => (
    <MUISwitch
        color="primary"
        {...inputProps}
        {...custom}
        name={name}
        checked={Boolean(value)}
    />
);

export const Switch = ({
    name,
}) => (
    <Field
        component={_Switch}
        name={name}
        type="checkbox"
    />
);
Switch.propTypes = {
    name: PropTypes.string,
};

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
