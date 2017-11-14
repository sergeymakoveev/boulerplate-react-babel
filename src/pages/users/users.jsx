import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import { PropTypesRoute, PropTypesUsers } from 'proptypes';
import ACTIONS from './actions';

import { routes } from 'pages';


class Users extends React.Component {

    static propTypes = {
        ...PropTypesRoute,
        list: PropTypesUsers,
        load: PropTypes.func,
        remove: PropTypes.func,
    }

    constructor( props ) {
        super( props );
        const { load } = props;
        load();
    }

    onRemove = (src) => {
        this.props.remove(src, this.onRemoveSuccess);
    }

    onRemoveSuccess = (data) => {
        this.props.load();
        return data;
    }

    render() {
        const { list = [], history } = this.props;
        const onEdit =
            (user) =>
            () => history.push(routes.users(user.id));
        return (
            <div>
                <h1>
                    Users
                    <Link to={routes.users('new')}>
                        <FloatingActionButton
                            style={{
                                verticalAlign: 'middle',
                                marginLeft: '20px'
                            }}
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>
                </h1>
                <Table
                    multiSelectable={true}
                    onRowSelection={(e) => console.warn({e})}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Login</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true}>
                    {
                        list.map(
                            ( user ) => {
                                const onClick = onEdit(user);
                                return (
                                    <TableRow
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        key={user.id}
                                    >
                                        <TableRowColumn><div onClick={onClick}>{user.id}</div></TableRowColumn>
                                        <TableRowColumn><div onClick={onClick}>{user.name}</div></TableRowColumn>
                                        <TableRowColumn><div onClick={onClick}>{user.email}</div></TableRowColumn>
                                        <TableRowColumn><div onClick={onClick}>{user.login}</div></TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton
                                            touch={true}
                                            onClick={() => this.onRemove(user)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                                );
                            }
                        )
                    }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default
    connect(
        (state) => ({
            list: state.users.list,
        }),
        // bind account loading action creator
        ({
            load: ACTIONS.USERS_LIST,
            remove: ACTIONS.USERS_REMOVE,
        }),
    )( Users );
