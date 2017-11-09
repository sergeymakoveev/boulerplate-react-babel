import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { TextField, validators } from 'externals/redux-form-material-ui';

import CommonDialog from 'components/dialog';

import ACTIONS from './actions';
import { PropTypesRoute, PropTypesUser } from 'proptypes';


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
        ...PropTypesRoute,
        dispatch: PropTypes.func,
        initialValues: PropTypesUser,
        load: PropTypes.any,
        onClose: PropTypes.func,
        handleSubmit: PropTypes.func,
    }

    state = {
        data: {}
    };

    constructor(props) {
        const { match: { params }, load } = props;
        super(props);
        console.warn('user: constructor', { props });
        load(params.id);
    }

    // componentWillReceiveProps(nextProps) {
    //     const { load, dispatch } = nextProps;
    //     const getId = R.path('match.params.id'.split('.'));
    //     const id = getId(nextProps);
    //     console.warn(
    //         'componentWillReceiveProps',
    //         { id, props: this.props, nextProps }
    //     );
    //     id !== getId(this.props)
    //     && dispatch(load(id));
    // }

    // onSubmit = () => {
    //     this.props.onSubmit
    //     && this.props.onSubmit();
    // }

    onClose = () => {
        this.props.history.push('/users');
        this.props.onClose
        && this.props.onClose();
    }

    render() {
        const props = this.props;
        const user = props.initialValues || {};
        console.warn('user: render', {props});
        return (
            <CommonDialog
                contentStyle={{ width: '300px' }}
                title={
                    R.isEmpty(user)
                    ? 'New user'
                    : `User: ${user.name}`
                }
                onClose={this.onClose}
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

export default connect(
    (state) => ({
        // pull initial values from account reducer
        initialValues: state.users.show
    }),
    // bind account loading action creator
    ({
        load: ACTIONS.USERS_SHOW,
    }),
)(
    reduxForm({
        form: 'FormUser',
        // enableReinitialize: true,
        // validate,
        // asyncValidate,
    })(User)
);
