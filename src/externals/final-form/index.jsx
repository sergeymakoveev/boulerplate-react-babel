import './index.scss';

import fp from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';


export class FormField extends React.PureComponent {

    static propTypes = {
        input: PropTypes.object,
        labelCancel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        placeholder: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string,
            warning: PropTypes.string
        }),
    };

    render(){
        const {
            input,
            placeholder,
            label,
            type,
            id,
            name,
            meta: { touched, error, warning },
        } = this.props;
        const omitUndefined = fp.omitBy(fp.isUndefined);
        const id_ = id || name;
        const props_input = omitUndefined({ id: id_, placeholder, type });
        const props_label = omitUndefined({ htmlFor: id_ });
        return (
            <div className='FormField'>
                {
                    label
                    && <label {...props_label}>{label}</label>
                }
                <input {...input} {...props_input} />
                {
                    touched
                    && (
                        (error && <span className='error'>{error}</span>) ||
                        (warning && <span className='warning'>{warning}</span>)
                    )
                }
            </div>
        );
    }

}

export default FormField;
