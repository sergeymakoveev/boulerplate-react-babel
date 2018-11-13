import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconHome from '@material-ui/icons/Home';
import IconInfo from '@material-ui/icons/Info';
import IconUsers from '@material-ui/icons/People';

import { routes } from 'pages';


const ListItemLink = ({ children, to, path, exact }) => {
    const selected = path === '/' || exact
        ? path === to
        : path.startsWith(to);
    return (
        <Link
            style={{ textDecoration: 'none' }}
            to={to}
            exact={exact}
        >
            <ListItem button selected={selected}>
                {children}
            </ListItem>
        </Link>
    );
};

ListItemLink.propTypes = {
    to: PropTypes.string,
    path: PropTypes.string,
    exact: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const Menu = ({ route }) => {
    const { pathname: path } = route;
    return (
        <List component="nav">
            <ListItemLink to={routes.home()} path={path} exact="true">
                <ListItemIcon><IconHome /></ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemLink>
            <ListItemLink to={routes.about()} path={path}>
                <ListItemIcon><IconInfo /></ListItemIcon>
                <ListItemText primary="About" />
            </ListItemLink>
            <ListItemLink to={routes.users()} path={path}>
                <ListItemIcon><IconUsers /></ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemLink>
            <ListItemLink to="/experiments" path={path}>
                <ListItemIcon><IconUsers /></ListItemIcon>
                <ListItemText primary="Experiments" />
            </ListItemLink>
        </List>
    );
};

Menu.propTypes = {
    route: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

export default connect(
    ({ router }) => ({ route: router.location })
)(Menu);
