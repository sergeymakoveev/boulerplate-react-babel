import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Checkbox from 'material-ui/Checkbox';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {
    Table,
    TableBody,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import { PropTypesRoute, PropTypesUsers } from 'proptypes';
import { ACTIONS } from 'models/users';

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

    render() {
        const { list = [], history, remove, load, patch } = this.props;
        const { selected } = this.state;
        const count = selected.length;
        const selected_items =
            R.filter(
                ({ id }) => selected.includes(id),
                list
            );
        const buttonProps = {
            disabled: !count,
            primary: true,
            style: {
                marginRight: '20px',
            },
        };
        const isAllSelected = R.equals(selected, R.pluck('id', list));
        const onEdit =
            (src) =>
            () => history.push(routes.users(src.id))
        const onPatch =
            (src, data) =>
            () => patch(src, data, load);
        const onRemove =
            (src) =>
            () => remove(src, load);
        const onSelect =
            (id) =>
            () => this.setState({
                selected: (
                    id === 'none'
                    ? []
                    : id === 'all'
                        ? R.pluck('id', list)
                        : selected.includes(id)
                            ? R.reject(R.equals(id), selected)
                            : [...selected, id]
                )
            });
        return (
            <div>
                <h1>Users</h1>
                <div>
                    <Link to={routes.users('new')}>
                        <RaisedButton
                            {...buttonProps}
                            label="Add"
                            title="Add new user"
                        />
                    </Link>
                    <RaisedButton
                        {...buttonProps}
                        label={`Delete (${count})`}
                        title="Delete selected"
                        onClick={onRemove(selected_items)}
                    />
                    <RaisedButton
                        {...buttonProps}
                        label={`Enable (${count})`}
                        title="Enable selected"
                        onClick={onPatch(selected_items, { enabled: true })}
                    />
                    <RaisedButton
                        {...buttonProps}
                        label={`Disable (${count})`}
                        title="Disable selected"
                        onClick={onPatch(selected_items, { enabled: false })}
                    />
                </div>
                <Table
                    style={{ width: 'inherit' }}
                    multiSelectable={true}
                >
                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheck={onSelect(isAllSelected ? 'none' : 'all')}
                                />
                            </TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Login</TableHeaderColumn>
                            <TableHeaderColumn>Enabled</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
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
                                        >
                                            <TableRowColumn>
                                                <Checkbox
                                                    checked={selected.includes(item.id)}
                                                    onCheck={onSelect(item.id)}
                                                />
                                            </TableRowColumn>
                                            <TableRowColumn>{item.name}</TableRowColumn>
                                            <TableRowColumn>{item.email}</TableRowColumn>
                                            <TableRowColumn>{item.login}</TableRowColumn>
                                            <TableRowColumn>
                                                <Toggle
                                                    toggled={item.enabled}
                                                    onToggle={onPatch(item, { enabled: !item.enabled })}
                                                />
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <IconButton
                                                    title="Delete"
                                                    onClick={onRemove(item)}
                                                >
                                                    <IconDelete />
                                                </IconButton>
                                                <IconButton
                                                    title="Edit"
                                                    onClick={onEdit(item)}
                                                >
                                                    <IconEdit />
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
            load: ACTIONS.LIST,
            patch: ACTIONS.PATCH,
            remove: ACTIONS.REMOVE,
        }),
    )( Users );
