import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { TextField, validators } from 'externals/redux-form-material-ui';

import CommonDialog from 'components/dialog';

import ACTIONS from './actions';
import { PropTypesUser } from 'proptypes';
import helpers from 'helpers';

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
        dispatch: PropTypes.func,
        initialValues: PropTypesUser,
        load: PropTypes.any,
        load_test: PropTypes.any,
        onClose: PropTypes.func,
        handleSubmit: PropTypes.func,
    }

    state = {
        data: {}
    };

    constructor(props) {
        const { data, load } = props;
        super(props);
        console.warn('constructor', { props });
        data.id
        && load(data.id);
    }

    // componentWillReceiveProps(nextProps) {
    //     const { dispatch, data, load } = nextProps;
    //     console.warn(
    //         'componentWillReceiveProps',
    //         { props: this.props.initialValues, nextProps }
    //     );
    //     (data.id !== this.props.data.id)
    //     && dispatch(load(data.id));
    // }

    // onSubmit = () => {
    //     this.props.onSubmit
    //     && this.props.onSubmit();
    // }

    render() {
        const props = this.props;
        const user = helpers.path(props.initialValues);
        console.warn(
            'render',
            { id: props.id, initialValues: props.initialValues }
        );
        return (
            <CommonDialog
                contentStyle={{ width: '300px' }}
                title={`User: ${user('name')}` }
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
