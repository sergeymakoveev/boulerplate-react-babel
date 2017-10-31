import PropTypes from 'prop-types';
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export class CommonDialog extends React.Component {

    static defaultProps = {
        labelCancel: 'Cancel',
        labelSubmit: 'Submit',
        onClose: (e) => e,
        onSubmit: (e) => e,
        open: true
    };

    static propTypes = {
        labelCancel: PropTypes.string,
        labelSubmit: PropTypes.string,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        open: PropTypes.bool,
        children: PropTypes.array
    };

    state = {
        open: true
    };

    constructor( props ) {
        super( props );
        this.state.open = !!props.open;
    }

    onClose = (e) => {
        this.props.onClose
        && this.props.onClose(e);
        this.setState({ open: false });

    }

    render() {
        const { children, ...props } = this.props;
        return (
            <Dialog
                actions={[
                    props.labelCancel &&
                    <FlatButton
                        key="b-cancel"
                        label={props.labelCancel}
                        primary={true}
                        onClick={this.onClose}
                    />,
                    props.labelSubmit &&
                    <RaisedButton
                        type="submit"
                        key="b-submit"
                        label={props.labelSubmit}
                        primary={true}
                        onClick={props.onSubmit}
                    />
                ]}
                modal={false}
                open={this.state.open}
                onRequestClose={this.onClose}
                {...props}
            >
            { children }
            </Dialog>
        );
    }

}

export default CommonDialog;
