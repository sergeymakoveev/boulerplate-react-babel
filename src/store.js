import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { REDUCER as users } from 'models/users';


export const store = createStore(
    combineReducers({
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
