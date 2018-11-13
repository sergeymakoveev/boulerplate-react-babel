import fp from 'lodash/fp';

import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { PropTypesUser } from 'proptypes';

import SignIn from 'components/signin';


const Auth = ({ auth, children }) => (
    fp.isEmpty(auth)
        ? <SignIn />
        : <div>{children}</div>
);

Auth.propTypes = {
    auth: PropTypesUser,
    children: PropTypes.node.isRequired,
};

export default connect(
    ({ auth }) => ({ auth }),
    {}
)(Auth);
