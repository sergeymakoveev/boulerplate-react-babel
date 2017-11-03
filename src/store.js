import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { reducer as http } from 'api/http.reducer';

const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

const store = create(
    combineReducers({
        form,
        http,
    }),
    applyMiddleware (
        thunkMiddleware,
        createLogger(),
    )
);

export default store;
