import React from 'react';
import { Link } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import api from 'api/http';
import { PropTypesRoute } from 'proptypes';

import { routes } from 'pages';


export class Users extends React.Component {

    static propTypes = PropTypesRoute

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
        console.warn({prooops: this.props });
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        this.state.users
                            .map(( user ) => (
                                <TableRow key={user.id}>
                                    <TableRowColumn>{ user.id }</TableRowColumn>
                                    <TableRowColumn>
                                        <Link to={routes.users(user.id)}>
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
