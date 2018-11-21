import './index.html';
import './index.scss';

/* _eslint-disable no-unused-vars */

import fp from 'lodash/fp';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconMenu from '@material-ui/icons/Menu';

import { APIConnector } from 'api';
import { history, store } from 'store';

import { routes, PageAbout, PageHome, PageUser, PageUsers, PageExperiments } from 'pages';

import { MenuDrawer, MenuToolbar } from 'components';
import Auth from 'components/auth';

import { MuiTheme } from 'externals/material-ui';
import { stopPropagation } from 'helpers/dom';


const styles_layout = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    main: {
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
    overlay: {
        height: '100%',
    },
});

class Layout extends React.Component {
    static propTypes = {
        classes: PropTypes.shape({
            appBar: PropTypes.string,
            main: PropTypes.string,
            overlay: PropTypes.string,
        }),
    };

    state = {
        drawer: false,
        title: 'React-Babel boulerplate',
    };

    toggleDrawer = (state) => () => {
        this.setState(({ drawer }) => ({
            drawer: fp.isUndefined(state) ? !drawer : state,
        }));
    };

    render() {
        const { title, drawer } = this.state;
        const { classes } = this.props;
        return (
            <div
                role="presentation"
                className={classes.overlay}
                onClick={this.toggleDrawer(false)}
            >
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            onClick={stopPropagation(this.toggleDrawer())}
                        >
                            <IconMenu />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            {title}
                        </Typography>
                        <MenuToolbar />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={drawer}
                >
                    <div className={classes.toolbar} />
                    <MenuDrawer />
                </Drawer>
                <main className={classes.main}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path={routes.home()} exact component={PageHome} />
                        <Route path={routes.about()} component={PageAbout} />
                        <Route path={routes.users()} component={PageUsers} />
                        <Route path="/experiments" component={PageExperiments} />
                        <Route
                            path="*"
                            render={
                                ({ location }) => (
                                    <h3>
                                        404:
                                        {location.pathname}
                                    </h3>
                                )
                            }
                        />
                    </Switch>
                    <Route path={routes.users(':id')} exact component={PageUser} />
                </main>
            </div>
        );
    }
}

const LayoutStyled = withStyles(styles_layout, { withTheme: true })(Layout);

ReactDOM.render(
    <Provider store={store}>
        <APIConnector>
            <MuiTheme>
                <Auth>
                    <ConnectedRouter history={history}>
                        <LayoutStyled />
                    </ConnectedRouter>
                </Auth>
            </MuiTheme>
        </APIConnector>
    </Provider>,
    document.getElementById('layout')
);
