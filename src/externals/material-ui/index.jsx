// import './index.scss'
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import React from 'react';

// eslint-disable-next-line react/prop-types
export const Theme = ({ children }) => (
    <React.Fragment>
        <CssBaseline />
        { children }
    </React.Fragment>
);
