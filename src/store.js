import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { REDUCER as users } from 'models/users';
import { REDUCER as auth } from 'models/auth';

// import { browserHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

export const store = createStore(
    combineReducers({
        auth,
        users,
        router,
    }),
    composeWithDevTools(
        applyMiddleware (
            routerMiddleware(history),
            thunk,
            createLogger(),
        )
    )
);

export default store;
