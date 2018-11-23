import PropTypes from 'prop-types';
import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { PropTypesChildren } from 'proptypes';


class CommonDialog extends React.Component {
    static defaultProps = {
        cancel_label: 'Cancel',
        submit_label: 'Submit',
        onClose: (e) => e,
        onSubmit: (e) => e,
        open: true,
    };

    static propTypes = {
        cancel_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        submit_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        submit_disabled: PropTypes.bool,
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
        const {
            children,
            title,
            text,
            onSubmit,
            submit_label,
            cancel_label,
            submit_disabled,
            ...props
        } = this.props;
        const { open } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.onClose}
                {...props}
            >
                {
                    title
                    && <DialogTitle>{ title }</DialogTitle>
                }
                <DialogContent>
                    {
                        text
                        && <DialogContentText>{ text }</DialogContentText>
                    }
                    { children }
                </DialogContent>
                <DialogActions>
                    {[
                        cancel_label && (
                            <Button
                                color="primary"
                                key="b-cancel"
                                onClick={this.onClose}
                            >
                                {cancel_label}
                            </Button>
                        ),
                        submit_label && (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                key="b-submit"
                                onClick={onSubmit}
                                disabled={submit_disabled}
                            >
                                {submit_label}
                            </Button>
                        ),
                    ]}
                </DialogActions>
            </Dialog>
        );
    }
}

export default CommonDialog;
