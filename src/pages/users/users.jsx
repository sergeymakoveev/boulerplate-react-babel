import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';
import Badge from 'material-ui/Badge';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';
import {
    Table,
    TableBody,
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

    render() {
        const { list = [], history, remove, load, patch } = this.props;
        const { selected } = this.state;
        const count = selected.length;
        const selected_items =
            R.filter(
                ({ id }) => selected.includes(id),
                list
            );
        const bageProps = {
            badgeContent: count,
            badgeStyle: {
                right: 20,
                top: 20,
                ...(count ? {} : { display: 'none' })
            }
        };
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
                <Link to={routes.users('new')}>
                    <FloatingActionButton>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
                <Badge {...bageProps}>
                    <FloatingActionButton
                        title="Delete selected"
                        disabled={!count}
                        onClick={onRemove(selected_items)}
                    >
                        <DeleteIcon />
                    </FloatingActionButton>
                </Badge>
                <Badge {...bageProps}>
                    <FloatingActionButton
                        title="Enable selected"
                        disabled={!count}
                        onClick={onPatch(selected_items, { enabled: true })}
                    >
                        <VisibilityIcon />
                    </FloatingActionButton>
                </Badge>
                <Badge {...bageProps}>
                    <FloatingActionButton
                        title="Disable selected"
                        disabled={!count}
                        onClick={onPatch(selected_items, { enabled: false })}
                    >
                        <VisibilityOffIcon />
                    </FloatingActionButton>
                </Badge>
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
                                    checked={false}
                                    onCheck={onSelect('all')}
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
                                        <TableRowColumn onClick={onEdit(item)}>{item.name}</TableRowColumn>
                                        <TableRowColumn onClick={onEdit(item)}>{item.email}</TableRowColumn>
                                        <TableRowColumn onClick={onEdit(item)}>{item.login}</TableRowColumn>
                                        <TableRowColumn>
                                            <Toggle
                                                toggled={item.enabled}
                                                onToggle={onPatch(item, { enabled: !item.enabled })}
                                            />
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <IconButton
                                                touch={true}
                                                onClick={onRemove(item)}
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
            patch: ACTIONS.USERS_PATCH,
            remove: ACTIONS.USERS_REMOVE,
        }),
    )( Users );
