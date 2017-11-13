import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
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

import { PropTypesRoute, PropTypesUsers } from 'proptypes';
import ACTIONS from './actions';

import { routes } from 'pages';


class Users extends React.Component {

    static propTypes = {
        ...PropTypesRoute,
        list: PropTypesUsers,
        load: PropTypes.any,
    }

    constructor( props ) {
        super( props );
        const { load } = props;
        load();
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        list.map(
                            ( user ) => (
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
        }),
    )( Users );
