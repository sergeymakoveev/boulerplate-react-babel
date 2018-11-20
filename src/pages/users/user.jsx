import fp from 'lodash/fp';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { TextField } from 'externals/material-ui.final-form';
import validators from 'helpers/form-validators';

import CommonDialog from 'components/dialog';

import { ACTIONS } from 'models/users';
import { PropTypesRoute, PropTypesUser } from 'proptypes';
import { getName } from 'pages/users';


const VALIDATORS = {
    name: validators.pipe(
        validators.required,
        validators.is.cyralphanumeric,
        validators.has.nospace,
    ),
    email: validators.pipe(
        validators.required,
        validators.is.email,
    ),
};

class Page extends React.Component {
    static propTypes = {
        ...PropTypesRoute,
        initialValues: PropTypesUser,
        load: PropTypes.func,
        onClose: PropTypes.func,
    }

    constructor(props) {
        super(props);
        const { match: { params }, load } = props;
        load(params.id);
    }

    onSubmit = (data) => {
        const { create, update } = this.props;
        (+data.id ? update : create)(data, this.onSubmitSuccess);
    }

    onSubmitSuccess = (data) => {
        const { list, onSubmit = fp.identity } = this.props;
        this.onClose();
        list();
        return onSubmit(data);
    }

    onClose = () => {
        const { history, onClose } = this.props;
        history.push('/users');
        onClose && onClose();
    }

    render() {
        const { data = {} } = this.props;
        const name = getName(data.lastName, data.firstName);
        return (
            <Form
                initialValues={data}
                onSubmit={this.onSubmit}
            >
                {({ handleSubmit /* , submitting, pristine, invalid, form */ }) => (
                    <CommonDialog
                        title={
                            fp.isEmpty(data)
                                ? 'New user'
                                : `User: ${name}`
                        }
                        onClose={this.onClose}
                        onSubmit={handleSubmit}
                    >
                        <Field
                            style={{ width: '100%' }}
                            component={TextField}
                            name="firstName"
                            label="First name"
                            validate={
                                VALIDATORS.name
                            }
                        />
                        <br />
                        <br />
                        <Field
                            style={{ width: '100%' }}
                            component={TextField}
                            name="lastName"
                            label="Last name"
                            validate={
                                VALIDATORS.name
                            }
                        />
                        <br />
                        <br />
                        <Field
                            style={{ width: '100%' }}
                            component={TextField}
                            name="email"
                            label="Email"
                            validate={
                                VALIDATORS.email
                            }
                        />
                    </CommonDialog>
                )}
            </Form>
        );
    }
}

export default connect(
    (state) => ({
        // pull initial values from account reducer
        data: state.users.item,
    }),
    // bind account loading action creator
    ({
        list: ACTIONS.LIST,
        create: ACTIONS.CREATE,
        load: ACTIONS.ITEM,
        update: ACTIONS.UPDATE,
    }),
)(Page);
