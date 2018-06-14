import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from 'models/auth';

import { Form, Field } from 'react-final-form';
import { TextField } from 'externals/material-ui.final-form';
import validators from 'helpers/form-validators';

import { CommonDialog } from 'components/dialog';


const VALIDATORS = {
    login: validators.pipe(
        validators.required,
        validators.is.email
    ),
    password: validators.pipe(
        validators.required,
        validators.length.min(5)
    )
};

class SignIn extends React.PureComponent {

    static propTypes = {
        signin: PropTypes.func
    }

    render() {
        return (
            <Form onSubmit={this.props.signin}>
                {({ handleSubmit /*, submitting, pristine, invalid, form*/ }) => (
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
        signin: ACTIONS.SIGNIN
    }
)(SignIn);
