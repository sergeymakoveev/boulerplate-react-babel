import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';


const Loading = () => (
    <RefreshIndicator
        size={400}
        left={100}
        top={100}
        status="loading"
    />
);

export default Loading;
