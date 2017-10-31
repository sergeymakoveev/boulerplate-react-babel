import PropTypes from 'prop-types';
import React from 'react';

import { reduxForm, Field } from 'redux-form';
import { TextField, validators } from 'externals/redux-form-material-ui';

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
        handleSubmit: PropTypes.func
    }

    render() {
        const { handleSubmit /*, pristine, submitting */} = this.props;
        return (
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
        );
    }

}

export default reduxForm({
    form: 'FormSignIn',
    // validate,
    // asyncValidate,
})(SignIn);
