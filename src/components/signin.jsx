import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { ACTIONS } from 'models/auth';
import { TextField } from 'externals/material-ui.final-form';
import validators from 'helpers/form-validators';

import CommonDialog from 'components/dialog';


const VALIDATORS = {
    login: validators.pipe(
        validators.required,
        validators.is.email
    ),
    password: validators.pipe(
        validators.required,
    ),
};

class SignIn extends React.PureComponent {
    static propTypes = {
        signin: PropTypes.func,
    }

    render() {
        const { signin } = this.props;
        return (
            <Form onSubmit={signin}>
                {({ handleSubmit /* , submitting, pristine, invalid, form */ }) => (
                    <CommonDialog
                        contentStyle={{ width: '300px' }}
                        title="Sign In"
                        onSubmit={handleSubmit}
                        labelSubmit="Sign In"
                        labelCancel={false}
                    >
                        <Field
                            style={{ width: '100%' }}
                            component={TextField}
                            name="login"
                            hintText="Login"
                            floatingLabelText="Login"
                            validate={
                                VALIDATORS.login
                            }
                        />
                        <br />
                        <Field
                            style={{ width: '100%' }}
                            component={TextField}
                            type="password"
                            name="password"
                            hintText="Password"
                            floatingLabelText="Password"
                            validate={
                                VALIDATORS.password
                            }
                        />
                    </CommonDialog>
                )}
            </Form>
        );
    }
}

export default connect(
    () => ({}),
    {
        signin: ACTIONS.SIGNIN,
    }
)(SignIn);
