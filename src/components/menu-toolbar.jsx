import fp from 'lodash/fp';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import IconMenu from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MUIMenu from '@material-ui/core/Menu';
import MUIMenuItem from '@material-ui/core/MenuItem';

import { ACTIONS } from '~/models/auth';


class Menu extends React.PureComponent {
    static propTypes = {
        signout: PropTypes.func,
    }

    state = {
        anchorEl: null,
    };

    toggle = (state) => ({ currentTarget }) => {
        this.setState(({ anchorEl }) => ({
            anchorEl: (
                fp.isUndefined(state)
                    ? anchorEl
                        ? null
                        : currentTarget
                    : state
            ),
        }));
    };

    render() {
        const { signout } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <React.Fragment>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.toggle()}
                >
                    <IconMenu />
                </IconButton>
                { anchorEl && (
                    <MUIMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.toggle(false)}
                    >
                        <MUIMenuItem>Refresh</MUIMenuItem>
                        <MUIMenuItem>Help</MUIMenuItem>
                        <MUIMenuItem onClick={signout}>Sign out</MUIMenuItem>
                    </MUIMenu>
                )}
            </React.Fragment>
        );
    }
}

export default connect(
    () => ({}),
    {
        signout: ACTIONS.SIGNOUT,
    }
)(Menu);
