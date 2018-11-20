import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const size = 100;

const Loading = () => (
    <CircularProgress
        style={{
            position: 'fixed',
            width: `${size}px`,
            height: `${size}px`,
            top: '50%',
            left: '50%',
            marginTop: `-${size / 2}px`,
            marginLeft: `-${size / 2}px`,
        }}
    />
);

export default Loading;
