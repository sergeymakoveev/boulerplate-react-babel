import { combineReducers, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';

import { REDUCER as users } from '~/models/users';
import { REDUCER as auth } from '~/models/auth';


export const history = createBrowserHistory();

export const store = createStore(
    combineReducers({
        auth,
        users,
        router: connectRouter(history),
    }),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            createLogger(),
        )
    )
);

export default store;
