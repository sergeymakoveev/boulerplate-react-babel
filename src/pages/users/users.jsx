import React from 'react';
import { Link } from 'react-router-dom';

import * as helpers from 'helpers';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import * as api from 'api/http';


export class Users extends React.Component {

    state = {
        users: []
    };

    constructor( props ) {
        super( props );
        api.users
            .list()
            .then( (users) => this.setState({ users }) );
    }

    render() {
        const props = helpers.path(this.props);
        return (
            <div>
                <h1>Users</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Login</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        this.state.users
                            .map(( user ) => (
                                <TableRow key={user.id}>
                                    <TableRowColumn>{ user.id }</TableRowColumn>
                                    <TableRowColumn>
                                        <Link to={`${props('match.url')}/${user.id}`}>
                                            { user.name }
                                        </Link>
                                    </TableRowColumn>
                                    <TableRowColumn>{ user.email }</TableRowColumn>
                                    <TableRowColumn>{ user.login }</TableRowColumn>
                                </TableRow>
                            ))
                    }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Users;