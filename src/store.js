import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { reducer as users } from 'pages/users/reducer';


const store = createStore(
    combineReducers({
        form,
        users,
    }),
    composeWithDevTools(
        applyMiddleware (
            thunkMiddleware,
            createLogger(),
        )
    )
);

export default store;
