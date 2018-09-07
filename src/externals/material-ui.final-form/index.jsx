import PropTypes from 'prop-types';
import React from 'react';

import { default as _TextField } from 'material-ui/TextField';



export class TextField extends React.PureComponent {

    static propTypes = {
        input: PropTypes.object,
        render: PropTypes.func,
        label: PropTypes.string,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        })
    }

    render() {
        const {
            // eslint-disable-next-line no-unused-vars
            render,
            meta: { touched, error },
            input: { name, value, ...inputProps },
            ...custom
        } = this.props;
        return (
            <_TextField
                {...inputProps}
                {...custom}
                name={name}
                value={value}
                errorText={ touched && error }
            />
        );
    }

}
