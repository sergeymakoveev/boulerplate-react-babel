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
    CHECK:
        () =>
            (dispath) => {
                const data = fp.omitBy(
                    fp.isEmpty,
                    {
                        access_token: localStorage.getItem('access_token') || '',
                        refresh_token: localStorage.getItem('refresh_token') || '',
                        token_type: localStorage.getItem('token_type') || '',
                    }
                );
                return (
                    data.access_token
                        ? API.rest.auth.check(data.access_token)
                            .then(
                                () => { dispath(ACTIONS.SIGNEDIN({ data })); },
                                () => { dispath(ACTIONS.SIGNEDIN({})); }
                            )
                        : dispath(ACTIONS.SIGNEDIN({}))
                );
            },
    RECONNECT:
        (cb) =>
            (dispath) => (
                API.rest.auth.reconnect()
                    .then(
                        (data) => {
                            dispath(ACTIONS.SIGNEDIN({ data }));
                            return cb(data);
                        },
                        () => { dispath(ACTIONS.SIGNEDOUT()); }
                    )
            ),
    SIGNIN:
        (req) =>
            (dispath) => (
                API.rest.auth.signin(req)
                    .then((data) => { dispath(ACTIONS.SIGNEDIN({ data })); })
            ),
    SIGNEDIN:
        ({ data }) => {
            storeTokens(data);
            return { type: TYPES.AUTH_SIGNEDIN, data };
        },
    SIGNOUT:
        () =>
            (dispath) => (
                API.rest.auth
                    .signout()
                    .then(() => { dispath(ACTIONS.SIGNEDOUT()); })
            ),
    SIGNEDOUT:
        () => {
            storeTokens();
            return { type: TYPES.AUTH_SIGNEDOUT };
        },
};

export default ACTIONS;
