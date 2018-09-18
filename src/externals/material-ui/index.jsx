import './index.scss';

import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const THEME = {
    ...lightBaseTheme,
    palette: {
        ...lightBaseTheme.palette,
        pickerHeaderColor: indigo500,
        primary1Color: indigo500,
        primary2Color: indigo700
    }
};

// eslint-disable-next-line react/prop-types
export const Theme = ({ children=[] }) => (
    <MuiThemeProvider muiTheme={getMuiTheme(THEME)}>
    { children }
    </MuiThemeProvider>
);
