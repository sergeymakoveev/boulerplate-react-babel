import fp from 'lodash/fp';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Switch } from 'externals/final-form';
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
        const onSubmit = (item) => {
            console.warn({ item });
            return (+item.id ? update : create)(item, onClose);
        };

        return (
            !data
                ? <Loading />
                : (
                    <Form
                        initialValues={data}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit, pristine, invalid /* , submitting, form */ }) => (
                            <CommonDialog
                                title={
                                    fp.isEmpty(data)
                                        ? 'New user'
                                        : `User: ${name}`
                                }
                                onClose={onClose}
                                onSubmit={handleSubmit}
                                submit_disabled={invalid || pristine}
                            >
                                <TextField
                                    style={{ width: '100%' }}
                                    name="firstName"
                                    label="First name"
                                    validate={
                                        VALIDATORS.name
                                    }
                                />
                                <br />
                                <br />
                                <TextField
                                    style={{ width: '100%' }}
                                    name="lastName"
                                    label="Last name"
                                    validate={
                                        VALIDATORS.name
                                    }
                                />
                                <br />
                                <br />
                                <TextField
                                    style={{ width: '100%' }}
                                    name="email"
                                    label="Email"
                                    validate={
                                        VALIDATORS.email
                                    }
                                />
                                <br />
                                <br />
                                <FormControlLabel
                                    style={{ margin: 0 }}
                                    label="Active"
                                    labelPlacement="start"
                                    control={
                                        <Switch name="active" />
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
