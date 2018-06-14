import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from 'models/auth';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class Menu extends React.PureComponent {

    static propTypes = {
        signout: PropTypes.func,
    }

    render(){
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem
                    primaryText="Sign out"
                    onClick={this.props.signout}
                />
            </IconMenu>
        );
    }
}

export default connect(
    () => ({}),
    {
        signout: ACTIONS.SIGNOUT
    }
)(Menu);
