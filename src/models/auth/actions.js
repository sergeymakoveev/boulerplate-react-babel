import fp from 'lodash/fp';
import API from 'api';


export const TYPES = {
    AUTH_SIGNEDIN: 'AUTH_SIGNEDIN',
    AUTH_SIGNEDOUT: 'AUTH_SIGNEDOUT',
};


function storeTokens({ access_token, refresh_token, token_type } = {}) {
    localStorage.setItem('access_token', access_token || '');
    localStorage.setItem('refresh_token', refresh_token || '');
    localStorage.setItem('token_type', token_type || '');
}

const ACTIONS = {
    CHECK: () => {
        const data = fp.omitBy(
            fp.isEmpty,
            {
                access_token: localStorage.getItem('access_token') || '',
                refresh_token: localStorage.getItem('refresh_token') || '',
                token_type: localStorage.getItem('token_type') || '',
            }
        );
        return { type: TYPES.AUTH_SIGNEDIN, data };
    },
    SIGNIN:
        (req) =>
            (dispath) => (
                API.rest.auth.signin(req)
                    .then((data) => dispath(ACTIONS.SIGNEDIN({ data })))
            ),
    // SIGNEDIN: createSyncAction(TYPES.AUTH_SIGNEDIN),
    SIGNEDIN: ({ data }) => {
        storeTokens(data);
        return { type: TYPES.AUTH_SIGNEDIN, data };
    },
    SIGNOUT:
        () =>
            (dispath) => (
                API.rest.auth
                    .signout()
                    .then(
                        () => dispath(ACTIONS.SIGNEDOUT())
                    )
            ),
    SIGNEDOUT: () => {
        storeTokens();
        return { type: TYPES.AUTH_SIGNEDOUT };
    },

};

export default ACTIONS;
