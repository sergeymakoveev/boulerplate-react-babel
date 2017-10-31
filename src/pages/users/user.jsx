import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';

import { reduxForm, Field } from 'redux-form';
import { TextField, validators } from 'externals/redux-form-material-ui';

import CommonDialog from 'components/dialog';

import * as api from 'api/http';
import * as helpers from 'helpers';

const VALIDATORS = {
    login: validators.pipe(
        validators.required,
        validators.is.email
    ),
    email: validators.pipe(
        validators.required,
        validators.is.email
    )
};

class User extends React.Component {

    static propTypes = {
        data: PropTypes.object,
        onClose: PropTypes.func,
        handleSubmit: PropTypes.func
    }

    state = {
        data: {}
    };

    constructor(props) {
        super(props);
        api.users
            .item( props.data.id )
            .then( (data) => this.setState({ data }) );
    }

    // onSubmit = () => {
    //     this.props.onSubmit
    //     && this.props.onSubmit();
    // }

    render() {
        const props = this.props;
        const state = this.state;
        const data = helpers.path(state.data);
        return R.complement(R.isEmpty)(state.data) && (
            <CommonDialog
                contentStyle={{ width: '300px' }}
                title={ `User: ${data('name')}` }
                onClose={props.onClose}
                onSubmit={props.handleSubmit}
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
                    name="email"
                    hintText="Email"
                    floatingLabelText="Email"
                    validate={
                        VALIDATORS.email
                    }
                />

            </CommonDialog>
        );
    }
}

export default reduxForm({
    form: 'FormUser',
    // validate,
    // asyncValidate,
})(User);
