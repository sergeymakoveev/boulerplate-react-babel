import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { REDUCER as users } from 'models/users';
import { REDUCER as auth } from 'models/auth';


export const store = createStore(
    combineReducers({
        auth,
        form,
        users,
    }),
    composeWithDevTools(
        applyMiddleware (
            thunk,
            createLogger(),
        )
    )
);

export default store;
