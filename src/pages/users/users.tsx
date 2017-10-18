import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

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
import { UserInterface } from 'api/http.interfaces';


export class Users extends React.Component<{}, {}> {

    public state = {
        users: []
    };

    constructor( props: RouteComponentProps<{}> ) {
        super( props );
        api.users
            .list()
            .then( (users) => this.setState({ users }) );
    }

    public render(): JSX.Element {
        const props = helpers.get(this.props);
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
                            .map(( user: UserInterface ) => (
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
