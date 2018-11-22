import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

import { ACTIONS } from 'models/auth';
import { TextField, PasswordField } from 'externals/material-ui.final-form';
import validators from 'helpers/form-validators';

import CommonDialog from 'components/dialog';


const VALIDATORS = {
    username: validators.pipe(
        validators.required,
        validators.is.email
    ),
    password: validators.pipe(
        validators.required,
    ),
};

class SignIn extends React.PureComponent {
    static propTypes = {
        signin: PropTypes.func.isRequired,
        classes: PropTypes.shape({
            dialog: PropTypes.string,
        }),
    }

    render() {
        const { signin } = this.props;
        return (
            <Form onSubmit={signin}>
                {({ handleSubmit, invalid /* , submitting, pristine, form */ }) => (
                    <CommonDialog
                        title="Sign In"
                        onSubmit={handleSubmit}
                        labelSubmit="Sign In"
                        labelCancel={false}
                        invalid={invalid}
                    >
                        <TextField
                            style={{ width: '100%' }}
                            name="username"
                            label="Login"
                            validate={
                                VALIDATORS.username
                            }
                        />
                        <br />
                        <br />
                        <PasswordField
                            style={{ width: '100%' }}
                            name="password"
                            label="Password"
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
