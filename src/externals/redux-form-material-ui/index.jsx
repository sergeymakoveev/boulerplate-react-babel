import PropTypes from 'prop-types';
import React from 'react';

import { default as _TextField } from 'material-ui/TextField';



export class TextField extends React.PureComponent {

    static propTypes = {
        input: PropTypes.object,
        label: PropTypes.string,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        })
    }

    render() {
        const { input, meta: { touched, error }, ...custom } = this.props;
        return (
            <_TextField
                {...input}
                {...custom}
                errorText={ touched && error }
            />
        );
    }

}
