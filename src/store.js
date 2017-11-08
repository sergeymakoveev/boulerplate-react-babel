import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer as users } from 'pages/users/reducer';


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
