import './index.html';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { APIConnector } from '~/api';
import { history, store } from '~/store';

import Auth from '~/components/auth';
import Loading from '~/components/loading';
import { MuiTheme } from '~/externals/material-ui';


const LayoutLoadable = Loadable({
    loader: () => Promise.resolve(import('./layout')),
    loading: Loading,
});

ReactDOM.render(
    <Provider store={store}>
        <APIConnector>
            <MuiTheme>
                <Auth>
                    <ConnectedRouter history={history}>
                        <LayoutLoadable />
                    </ConnectedRouter>
                </Auth>
            </MuiTheme>
        </APIConnector>
    </Provider>,
    document.getElementById('layout')
);
