import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { reducer as users } from 'pages/users/reducer';


// const create = window.devToolsExtension
//     ? window.devToolsExtension()(createStore)
//     : createStore;

const store = createStore(
    combineReducers({
        form,
        users,
    }),
    applyMiddleware (
        thunkMiddleware,
        createLogger(),
    )
);

export default store;
