import { connect } from 'react-redux';

import RestAPI from './rest';


const API = {};

export const APIConnector = connect(
    (state) => ({ auth: state.auth }),
)(
    ({ children, ...props }) => {
        API.rest = RestAPI(props);
        console.warn('APIConnector: ', props.auth);
        return children;
    }
);

export default API;
