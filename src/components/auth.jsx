import fp from 'lodash/fp';

import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { PropTypesUser } from 'proptypes';

import SignIn from 'components/signin';


class Auth extends React.PureComponent {
    static propTypes = {
        auth: PropTypesUser,
        children: PropTypes.node.isRequired,
    }

    render() {
        const { auth, children } = this.props;
        return (
            fp.isEmpty(auth)
                ? <SignIn />
                : <div>{children}</div>
        );
    }
}

export default connect(
    ({ auth }) => ({ auth }),
    {}
)(Auth);
