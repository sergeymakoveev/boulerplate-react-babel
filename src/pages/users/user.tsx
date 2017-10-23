import * as R from 'ramda';
import * as React from 'react';

import CommonDialog from 'components/dialog';

import * as api from 'api/http';
import { UserInterface } from 'api/http.interfaces';
import * as helpers from 'helpers';


interface UserDialogInterface {
    data: UserInterface;
    onClose?: () => void;
    onSubmit?: () => void;
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

    public onSubmit = () => {
        this.props.onSubmit
        && this.props.onSubmit();
    }

    public render() {
        const props = this.props;
        const state = this.state;
        const data = helpers.get(state.data);
        return R.complement(R.isEmpty)(state.data) && (
            <CommonDialog
                title={ `User: ${data('name')}` }
                onClose={props.onClose}
                onSubmit={this.onSubmit}
            >
                <h3>{ data('name') }</h3>
            </CommonDialog>
        );
    }
}

export default User;
