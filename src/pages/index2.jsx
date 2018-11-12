import './index.html';
import './index.scss';

/* _eslint-disable no-unused-vars */

import fp from 'lodash/fp';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { matchPath } from 'react-router';
import { NavLink, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconHome from '@material-ui/icons/Home';
import IconMenu from '@material-ui/icons/Menu';
import IconInfo from '@material-ui/icons/Info';
import IconUsers from '@material-ui/icons/People';

import { APIConnector } from 'api';
import store, { history } from 'store';

import { routes } from 'pages';
import About from 'pages/about';
import Home from 'pages/home';
import { User, Users } from 'pages/users';

import Menu from 'components/menu';
import Auth from 'components/auth';

import { MuiTheme } from 'externals/material-ui';
import { stopPropagation } from 'helpers';


const styles = (theme) => ({
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

const Link = connect(
    ({ router }) => ({ route: router.location })
)(({ children, to, route, exact }) => {
    const { pathname: path } = route;
    const selected = Boolean(matchPath(to, { path, exact: path === '/' || exact }));
    return (
        <NavLink to={to} exact={exact}>
            <ListItem button selected={selected}>
                {children}
            </ListItem>
        </NavLink>
    );
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
                        <Menu />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={drawer}
                >
                    <div className={classes.toolbar} />
                    <List component="nav">
                        <Link to={routes.home()} exact>
                            <ListItemIcon><IconHome /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </Link>
                        <Link to={routes.about()}>
                            <ListItemIcon><IconInfo /></ListItemIcon>
                            <ListItemText primary="About" />
                        </Link>
                        <Link to={routes.users()}>
                            <ListItemIcon><IconUsers /></ListItemIcon>
                            <ListItemText primary="Users" />
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.main}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path={routes.home()} exact component={Home} />
                        <Route path={routes.about()} component={About} />
                        <Route path={routes.users()} component={Users} />
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
                    <Route path={routes.users(':id')} exact component={User} />
                </main>
            </div>
        );
    }
}

const LayoutStyled = withStyles(styles, { withTheme: true })(Layout);

ReactDOM.render(
    <Provider store={store}>
        <APIConnector>
            <MuiTheme>
                <ConnectedRouter history={history}>
                    <Auth>
                        <LayoutStyled />
                    </Auth>
                </ConnectedRouter>
            </MuiTheme>
        </APIConnector>
    </Provider>,
    document.getElementById('layout')
);
