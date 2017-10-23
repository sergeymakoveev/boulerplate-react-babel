import * as PropTypes from 'prop-types';
import * as React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export interface DialogInterface {
    open?: boolean;
    contentStyle?: {};
    onClose?: () => void;
    onSubmit: () => void;
    labelCancel?: string;
    labelSubmit?: string;
    title?: string;
}

export class CommonDialog extends React.Component<DialogInterface> {

    public static defaultProps: DialogInterface = {
        labelCancel: 'Cancel',
        labelSubmit: 'Submit',
        onClose: () => {},
        onSubmit: () => {},
        open: true
    };

    public static propTypes = {
        labelCancel: PropTypes.string,
        labelSubmit: PropTypes.string,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        open: PropTypes.bool
    };

    public state = {
        open: true
    };

    constructor( props: DialogInterface ) {
        super( props );
        this.state.open = !!props.open;
    }

    public onClose = () => {
        this.props.onClose
        && this.props.onClose();
        this.setState({ open: false });

    }

    public render() {
        const { children, ...props } = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        key="b-cancel"
                        label={props.labelCancel}
                        primary={true}
                        onClick={this.onClose}
                    />,
                    <FlatButton
                        key="b-submit"
                        label={props.labelSubmit}
                        primary={true}
                        keyboardFocused={true}
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
