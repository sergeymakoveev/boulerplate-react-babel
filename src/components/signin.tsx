import * as React from 'react';

import TextField from 'material-ui/TextField';

import { CommonDialog } from 'components/dialog';


const SignIn: React.StatelessComponent = () => (
    <CommonDialog
        contentStyle={{ width: '300px' }}
        title="Sign In"
        onClose={() => alert('close')}
        onSubmit={() => alert('submit')}
        labelSubmit="SignIn"
    >
        <TextField
            style={{ width: '100%' }}
            hintText="Login"
            floatingLabelText="Login"
        />
        <br />
        <TextField
            style={{ width: '100%' }}
            hintText="Password"
            floatingLabelText="Password"
            type="password"
        />
    </CommonDialog>
);

export default SignIn;
