import API from 'api';
import { createSyncAction } from 'helpers/redux';


export const TYPES = {
    AUTH_SIGNIN: 'AUTH_SIGNIN',
    AUTH_SIGNEDIN: 'AUTH_SIGNEDIN',
    AUTH_SIGNOUT: 'AUTH_SIGNOUT',
    AUTH_SIGNEDOUT: 'AUTH_SIGNEDOUT',
};

// Sync actions creators
const ACTIONS = {
    SIGNEDIN: createSyncAction(TYPES.AUTH_SIGNEDIN),
    SIGNEDOUT: createSyncAction(TYPES.AUTH_SIGNEDOUT),
};

export default {

    ...ACTIONS,

    SIGNIN:
        (req) =>
        (dispath) => (
            API.rest.auth
                .signin(req)
                .then((data) => dispath(ACTIONS.SIGNEDIN({ data })))
        ),

    SIGNOUT:
        () =>
        (dispath) => (
            API.rest.auth
                .signout()
                .then(
                    () => dispath(ACTIONS.SIGNEDOUT())
                )
        ),

};
