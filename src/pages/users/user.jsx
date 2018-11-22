import fp from 'lodash/fp';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { TextField } from 'externals/material-ui.final-form';
import validators from 'helpers/form-validators';

import CommonDialog from 'components/dialog';
import Loading from 'components/loading';

import { ACTIONS, helpers } from 'models/users';
import { PropTypesRoute, PropTypesUser } from 'proptypes';


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
        create: PropTypes.func,
        data: PropTypesUser,
        load: PropTypes.func,
        reset: PropTypes.func,
        update: PropTypes.func,
    }

    componentDidMount() {
        const { match: { params }, load } = this.props;
        load(params.id);
    }

    render() {
        const { data, history, reset, create, update } = this.props;
        const name = helpers.getName(data);
        const onClose = () => {
            reset();
            history.push('/users');
        };
        const onSubmit = (item) =>
            (+item.id ? update : create)(item, onClose);

        return (
            !data
                ? <Loading />
                : (
                    <Form
                        initialValues={data}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit /* , submitting, pristine, invalid, form */ }) => (
                            <CommonDialog
                                title={
                                    fp.isEmpty(data)
                                        ? 'New user'
                                        : `User: ${name}`
                                }
                                onClose={onClose}
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
                )
        );
    }
}

export default connect(
    ({ users }) => ({
        // pull initial values from account reducer
        data: users.item,
    }),
    // bind account loading action creator
    ({
        list: ACTIONS.LIST,
        create: ACTIONS.CREATE,
        load: ACTIONS.ITEM,
        update: ACTIONS.UPDATE,
        reset: ACTIONS.ITEM_RESETTED,
    }),
)(Page);
