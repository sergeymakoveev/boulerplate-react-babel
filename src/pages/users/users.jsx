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

import Loading from 'components/loading';

import { routes } from 'pages';
import { getName } from 'pages/users';


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


class Page extends React.Component {
    static propTypes = {
        ...PropTypesRoute,
        list: PropTypesUsers,
        load: PropTypes.func,
        remove: PropTypes.func,
        reset: PropTypes.func,
    }

    state = {
        selected: [],
    }

    componentDidMount() {
        const { load } = this.props;
        load();
    }

    componentWillUnmount() {
        const { reset } = this.props;
        reset();
    }

    render() {
        const { data, history, remove, patch } = this.props;
        const { selected } = this.state;
        const list = data || [];
        const selected_items = fp.filter(
            ({ id }) => selected.includes(id),
            list
        );
        const count = selected_items.length;
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
            (src, d) =>
                () => patch(src, d);
        const onRemove =
            (src) =>
                () => remove(src);
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
                { !data && <Loading /> }
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
                        title="Activate selected"
                        onClick={onPatch(selected_items, { active: true })}
                    >
                        {`Activate (${count})`}
                    </Button>
                    <Button
                        {...buttonProps}
                        title="Deactivate selected"
                        onClick={onPatch(selected_items, { active: false })}
                    >
                        {`Deactivate (${count})`}
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
                            <TableCell>Active</TableCell>
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
                                        <TableCell>
                                            {getName(item)}
                                        </TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <Switch
                                                color="primary"
                                                checked={item.active}
                                                onChange={onPatch(item, { active: !item.active })}
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
        data: state.users.list,
    }),
    {
        load: ACTIONS.LIST,
        patch: ACTIONS.PATCH,
        remove: ACTIONS.REMOVE,
        reset: ACTIONS.LIST_RESETTED,
    },
)(Page);
