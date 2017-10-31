import PropTypes from 'prop-types';
import R from 'ramda';
import React from 'react';

import CommonDialog from 'components/dialog';

import api from 'api/http';
import helpers from 'helpers';


export class User extends React.Component {

    static propTypes = {
        data: PropTypes.object,
        onSubmit: PropTypes.func
    }

    state = {
        data: {}
    };

    constructor(props) {
        super(props);
        const p = props.data.id;
        api.users
            .item( p )
            .then( (data) => this.setState({ data }) );
    }

    onSubmit = () => {
        this.props.onSubmit
        && this.props.onSubmit();
    }

    render() {
        const props = this.props;
        const state = this.state;
        const data = helpers.get(state.data);
        return R.complement(R.isEmpty)(state.data) && (
            <CommonDialog
                title={ `User: ${data('name')}` }
                onClose={props.onClose}
                onSubmit={this.onSubmit}
            >
                <h3>{ data('name') }</h3>
            </CommonDialog>
        );
    }
}

export default User;
