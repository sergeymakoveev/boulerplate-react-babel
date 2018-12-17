import fp from 'lodash/fp';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PropTypesAuth } from '~/proptypes';
import { ACTIONS } from '~/models/auth';

import SignIn from '~/components/signin';
import Loading from '~/components/loading';


class Auth extends React.Component {
    static propTypes = {
        auth: PropTypesAuth,
        check: PropTypes.func,
        children: PropTypes.node.isRequired,
    };

    componentDidMount() {
        const { check } = this.props;
        check();
    }

    render() {
        const { auth, children } = this.props;
        return (
            fp.isNull(auth)
                ? <Loading />
                : fp.isEmpty(auth)
                    ? <SignIn />
                    : children
        );
    }
}

export default connect(
    ({ auth }) => ({ auth }),
    {
        check: ACTIONS.CHECK,
    }
)(Auth);
