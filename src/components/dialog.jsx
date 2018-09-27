import PropTypes from 'prop-types';
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { PropTypesChildren } from 'proptypes';


class CommonDialog extends React.Component {
    static defaultProps = {
        labelCancel: 'Cancel',
        labelSubmit: 'Submit',
        onClose: (e) => e,
        onSubmit: (e) => e,
        open: true,
    };

    static propTypes = {
        labelCancel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        labelSubmit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        open: PropTypes.bool,
        children: PropTypesChildren,
    };

    state = {
        open: true,
    };

    constructor(props) {
        super(props);
        this.state.open = !!props.open;
    }

    onClose = (e) => {
        const { onClose } = this.props;
        onClose && onClose(e);
        this.setState({ open: false });
    }

    render() {
        const { children, ...props } = this.props;
        const { open } = this.state;
        return (
            <Dialog
                actions={[
                    props.labelCancel
                    && (
                        <FlatButton
                            primary
                            key="b-cancel"
                            label={props.labelCancel}
                            onClick={this.onClose}
                        />
                    ),
                    props.labelSubmit
                    && (
                        <RaisedButton
                            primary
                            type="submit"
                            key="b-submit"
                            label={props.labelSubmit}
                            onClick={props.onSubmit}
                        />
                    ),
                ]}
                modal={false}
                open={open}
                onRequestClose={this.onClose}
                {...props}
            >
                { children }
            </Dialog>
        );
    }
}

export default CommonDialog;
