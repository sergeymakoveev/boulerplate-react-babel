import { connect } from 'react-redux';

import { ACTIONS } from '~/models/auth';
import RestAPI from './rest';


const API = {};

export const APIConnector = connect(
    (state) => ({ auth: state.auth }),
    {
        reconnect: ACTIONS.RECONNECT,
    }
)(
    ({ children, ...props }) => {
        API.rest = RestAPI(props);
        console.info('APIConnector: ', props.auth);
        return children;
    }
);

export default API;
