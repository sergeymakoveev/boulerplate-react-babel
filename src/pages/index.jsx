import './index.html';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import store from 'store';
import { routes } from 'pages';

// import DATA from 'data.json';
import { MuiTheme } from 'externals/material-ui';
import Auth from 'components/auth';
import Loading from 'components/loading';
import Menu from 'components/menu';
import About from 'pages/about';
import Home from 'pages/home';
// import Topics from 'pages/topics';
// import Categories from 'pages/categories';
import { User, Users } from 'pages/users';


injectTapEventPlugin();

const TopicsLoadable = Loadable({
    loader: () => new Promise((resolve) => setTimeout(() => resolve(import('pages/topics')), 3000)),
    loading: Loading
})
const CategoriesLoadable = Loadable({
    loader: () => import('pages/categories'),
    loading: Loading
})


class Layout extends React.Component {

    state = {
        drawer: false,
        title: 'React-Babel boulerplate'
    };

    toggleDrawer = () =>
        this.setState({ drawer: !this.state.drawer });

    render = () =>
        <Auth>
            <AppBar
                title={this.state.title}
                iconElementRight={<Menu />}
                onLeftIconButtonTouchTap={ this.toggleDrawer }
            />
            <Drawer
                docked={false}
                open={this.state.drawer}
                onRequestChange={ this.toggleDrawer }
            >
                <AppBar
                    iconElementLeft={<span />}
                    iconElementRight={<IconButton><NavigationMenu /></IconButton>}
                    onRightIconButtonTouchTap={ this.toggleDrawer }
                />
                <NavLink to={routes.home()} exact ><MenuItem>Home</MenuItem></NavLink>
                <NavLink to={routes.about()}><MenuItem>About</MenuItem></NavLink>
                <NavLink to={routes.categories()}><MenuItem>Categories</MenuItem></NavLink>
                <NavLink to={routes.topics()}><MenuItem>Topics</MenuItem></NavLink>
                <NavLink to={routes.users()}><MenuItem>Users</MenuItem></NavLink>
            </Drawer>
            <main id="main">
                <Switch>
                    <Route path={routes.home()} exact component={Home}/>
                    <Route path={routes.about()} component={About}/>
                    <Route path={routes.categories()} component={CategoriesLoadable} />
                    <Route path={routes.topics()} component={TopicsLoadable}/>
                    <Route path={routes.users()} component={Users}/>
                    <Route
                        path="*"
                        render={
                            ({ location }) => (
                                <h3>404: {location.pathname}</h3>
                            )
                        }
                    />
                </Switch>
                <Route path={`${routes.users()}/:id`} exact component={User} />
            </main>
        </Auth>;
}


ReactDOM.render(
    <Provider store={store}>
        <MuiTheme>
            <Router>
                <Layout />
            </Router>
        </MuiTheme>
    </Provider>,
    document.getElementById('layout')
);
