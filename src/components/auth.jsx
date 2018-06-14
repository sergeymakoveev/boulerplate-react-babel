import * as R from 'ramda';

import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { PropTypesUser } from 'proptypes';

import SignIn from 'components/signin';


class Auth extends React.PureComponent {

    static propTypes = {
        auth: PropTypesUser,
        children: PropTypes.element.isRequired,
    }

    render() {
        return (
            R.isEmpty(this.props.auth)
            ? <SignIn />
            : this.props.children
        );
    }

}

export default connect(
    ({ auth }) => ({ auth }),
    {}
)(Auth);
