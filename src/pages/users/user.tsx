import * as R from 'ramda';
import * as React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as api from 'api/http';
import { UserInterface } from 'api/http.interfaces';
import * as helpers from 'helpers';


interface UserDialogInterface {
    data: UserInterface;
    onClose: () => void;
}

export class User extends React.Component<UserDialogInterface> {

    public state = {
        data: {} as UserInterface
    };

    constructor(props: UserDialogInterface ) {
        super(props);
        const p = props.data.id;
        api.users
            .item( p )
            .then( (data: UserInterface) => this.setState({ data }) );
    }

    public render() {
        const props = this.props;
        const state = this.state;
        const data = helpers.get(state.data);
        return R.complement(R.isEmpty)(state.data) && (
            <Dialog
                title={ `User: ${data('name')}` }
                actions={[
                    <FlatButton
                        key="b-cancel"
                        label="Cancel"
                        primary={true}
                        onClick={props.onClose}
                    />,
                    <FlatButton
                        key="b-submit"
                        label="Submit"
                        primary={true}
                        keyboardFocused={true}
                        onClick={props.onClose}
                    />
                ]}
                modal={false}
                open={true}
                onRequestClose={props.onClose}
            >
                <h3>{ data('name') }</h3>
            </Dialog>
        );
    }
}

export default User;
