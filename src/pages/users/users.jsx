import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
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
        load: PropTypes.any,
        remove: PropTypes.func,
    }

    constructor( props ) {
        super( props );
        const { load } = props;
        load();
    }

    onRemove = (id) => {
        this.props.remove(id, this.onRemoveSuccess);
    }

    onRemoveSuccess = (data) => {
        this.props.load();
        return data;
    }

    render() {
        const { list = [] } = this.props;
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
                <Table>
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
                            ( user ) => (
                                <TableRow key={user.id}>
                                    <TableRowColumn>{ user.id }</TableRowColumn>
                                    <TableRowColumn>{ user.name }</TableRowColumn>
                                    <TableRowColumn>{ user.email }</TableRowColumn>
                                    <TableRowColumn>{ user.login }</TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton
                                            touch={true}
                                            onClick={() => this.onRemove(user)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            touch={true}
                                        >
                                            <Link to={routes.users(user.id)}>
                                                <EditIcon />
                                            </Link>
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            )
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
