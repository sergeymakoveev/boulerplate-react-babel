import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import Badge from 'material-ui/Badge';
import Toggle from 'material-ui/Toggle';
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



// class Countered extends React.Component {

//     static propTypes = {
//         count: PropTypes.number,
//         style: PropTypes.object,
//         children: PropTypes.element
//     }

//     render() {
//         const {count, children, style} = this.props;
//         return (
//             <Badge
//                 badgeContent={count}
//                 badgeStyle={{
//                     ...style,
//                     ...(count ? {} : {display: 'none'})
//                 }}
//             >
//                 {children}
//             </Badge>
//         );
//     }

// }


class Users extends React.Component {

    static propTypes = {
        ...PropTypesRoute,
        list: PropTypesUsers,
        load: PropTypes.func,
        remove: PropTypes.func,
    }

    state = {
        selected: []
    }

    constructor( props ) {
        super( props );
        props.load();
    }

    componentWillReceiveProps({ list }){
        const ids = R.pluck('id', list);
        const selected = R.filter(
            (id) => ids.includes(id),
            this.state.selected
        );
        this.setState({ selected });
    }

    onSelect = (id) => {
        const { list = [] } = this.props;
        const { selected } = this.state;
        const ids =
            id === 'none'
            ? []
            : id === 'all'
                ? R.pluck('id', list)
                : selected.includes(id)
                    ? R.reject(R.equals(id), selected)
                    : [ ...selected, id ];
        console.warn(selected, id, ids);
        this.setState({ selected: ids });
    }

    onRemove = (src) =>
        this.props.remove(src, this.onRemoveSuccess);

    onRemoveSuccess = (data) => {
        this.props.load();
        return data;
    }

    render() {
        const { list = [], history } = this.props;
        const { selected } = this.state;
        const count = selected.length;
        const getByIDs =
            (ids) =>
                R.filter(
                    ({id}) => ids.includes(id),
                    list
                );
        const badgeStyle = {
            right: 20,
            top: 20,
            ...(count ? {} : { display: 'none' })
        };
        const onClick =
            (user) =>
            ({ target: { tagName='', type='' } }) => (
                R.toLower(tagName) === 'td'
                ? history.push(routes.users(user.id))
                : R.toLower(type) === 'checkbox'
                    ? this.onSelect(user.id)
                    : false
            );
        return (
            <div>
                <h1>Users</h1>
                <Link to={routes.users('new')}>
                    <FloatingActionButton>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
                <Badge
                    badgeContent={count}
                    badgeStyle={badgeStyle}
                >
                    <FloatingActionButton
                        title="delete"
                        disabled={!count}
                        onClick={() => this.onRemove(getByIDs(selected))}
                    >
                        <DeleteIcon />
                    </FloatingActionButton>
                </Badge>
                <Table
                    multiSelectable={true}
                    onRowSelection={this.onSelect}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Login</TableHeaderColumn>
                            <TableHeaderColumn>Enabled</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        showRowHover={true}
                    >
                    {
                        list.map(
                            ( item ) => {
                                return (
                                    <TableRow
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        key={item.id}
                                        selected={selected.includes(item.id)}
                                        onClick={onClick(item)}
                                        selectable={false}
                                    >
                                        <TableRowColumn>{item.name}</TableRowColumn>
                                        <TableRowColumn>{item.email}</TableRowColumn>
                                        <TableRowColumn>{item.login}</TableRowColumn>
                                        <TableRowColumn>
                                            <Toggle
                                                defaultToggled={item.enabled}
                                            />
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <IconButton
                                                touch={true}
                                                onClick={() => this.onRemove(item)}
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
