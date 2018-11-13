import fp from 'lodash/fp';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
import Switch from '@material-ui/core/Switch';

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
        selected: [],
    }

    constructor(props) {
        super(props);
        props.load();
    }

    // UNSAFE_componentWillReceiveProps({ list }) {
    //     const ids = R.pluck('id', list);
    //     this.setState((state) => ({
    //         selected: R.filter(
    //             (id) => ids.includes(id),
    //             state.selected
    //         ),
    //     }));
    // }

    render() {
        const { list = [], history, remove, load, patch } = this.props;
        const { selected } = this.state;
        const count = selected.length;
        const selected_items = fp.filter(
            ({ id }) => selected.includes(id),
            list
        );
        const buttonProps = {
            variant: 'contained',
            disabled: !count,
            color: 'primary',
            style: {
                marginRight: '20px',
            },
        };
        const isAllSelected = !fp.isEmpty(selected) && fp.isEqual(selected, fp.map('id', list));
        const onEdit =
            (src) =>
                () => history.push(routes.users(src.id));
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
                                ? fp.map('id', list)
                                : selected.includes(id)
                                    ? fp.reject(fp.isEqual(id), selected)
                                    : [...selected, id]
                    ),
                });
        return (
            <div>
                <h1>Users</h1>
                <div>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={routes.users('new')}
                    >
                        <Button
                            {...buttonProps}
                            disabled={false}
                            title="Add new user"
                        >
                        Add
                        </Button>
                    </Link>
                    <Button
                        {...buttonProps}
                        title="Delete selected"
                        onClick={onRemove(selected_items)}
                    >
                        {`Delete (${count})`}
                    </Button>
                    <Button
                        {...buttonProps}
                        title="Enable selected"
                        onClick={onPatch(selected_items, { enabled: true })}
                    >
                        {`Enable (${count})`}
                    </Button>
                    <Button
                        {...buttonProps}
                        title="Disable selected"
                        onClick={onPatch(selected_items, { enabled: false })}
                    >
                        {`Disable (${count})`}
                    </Button>
                </div>
                <Table
                    style={{ width: 'inherit' }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    color="primary"
                                    checked={isAllSelected}
                                    onChange={onSelect(isAllSelected ? 'none' : 'all')}
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Login</TableCell>
                            <TableCell>Enabled</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list.map(
                                (item) => (
                                    <TableRow
                                        hover
                                        style={{ cursor: 'pointer' }}
                                        key={item.id}
                                        selected={selected.includes(item.id)}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                color="primary"
                                                checked={selected.includes(item.id)}
                                                onChange={onSelect(item.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.login}</TableCell>
                                        <TableCell>
                                            <Switch
                                                color="primary"
                                                checked={item.enabled}
                                                onChange={onPatch(item, { enabled: !item.enabled })}
                                            />
                                        </TableCell>
                                        <TableCell>
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
                                        </TableCell>
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

export default connect(
    (state) => ({
        list: state.users.list,
    }),
    {
        load: ACTIONS.LIST,
        patch: ACTIONS.PATCH,
        remove: ACTIONS.REMOVE,
    },
)(Users);
