import * as R from 'ramda';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { TextField } from 'externals/redux-form-material-ui';
import validators from 'helpers/form-validators';

import CommonDialog from 'components/dialog';

import { ACTIONS } from 'models/users';
import { PropTypesRoute, PropTypesUser } from 'proptypes';


const VALIDATORS = {
    login: validators.pipe(
        validators.required,
        validators.is.alphanumeric,
        validators.has.nospace,
        validators.length.min(5),
    ),
    name: validators.is.cyralphanumeric,
    email: validators.pipe(
        validators.required,
        validators.is.email,
    ),
};

class User extends React.Component {

    static propTypes = {
        ...PropTypesRoute,
        dispatch: PropTypes.func,
        initialValues: PropTypesUser,
        load: PropTypes.func,
        onClose: PropTypes.func,
        handleSubmit: PropTypes.func,
    }

    constructor(props) {
        super(props);
        const { match: { params }, load } = props;
        console.warn('user: constructor', { props });
        load(params.id);
    }

    onSubmit = (data) => {
        const { create, update } = this.props;
        (+data.id ? update : create)(data, this.onSubmitSuccess);
    }

    onSubmitSuccess = (data) => {
        const { list, onSubmit=R.identity } = this.props;
        this.onClose();
        list();
        return onSubmit(data);
    }

    onClose = () => {
        this.props.history.push('/users');
        this.props.onClose
        && this.props.onClose();
    }

    render() {
        const { handleSubmit, data={} } = this.props;
        return (
            <CommonDialog
                contentStyle={{ width: '300px' }}
                title={
                    R.isEmpty(data)
                    ? 'New user'
                    : `User: ${data.name}`
                }
                onClose={this.onClose}
                onSubmit={handleSubmit(this.onSubmit)}
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
                <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    name="name"
                    hintText="Name"
                    floatingLabelText="Name"
                    validate={
                        VALIDATORS.name
                    }
                />
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

export default connect(
    (state) => ({
        // pull initial values from account reducer
        initialValues: state.users.item,
        data: state.users.item,
    }),
    // bind account loading action creator
    ({
        list: ACTIONS.LIST,
        create: ACTIONS.CREATE,
        load: ACTIONS.ITEM,
        update: ACTIONS.UPDATE,
    }),
)(
    reduxForm({
        form: 'FormUser',
        enableReinitialize: true,
        // validate,
        // asyncValidate,
    })(User)
);
