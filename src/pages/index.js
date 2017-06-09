import './index.html';
import './index.scss';

import R from 'ramda';

import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {

    state = {
        title: 'React-Babel boulerplate',
    };

    // constructor( props ){
    //     super( props );
    // };

    // componentDidMount() {
    // }

    render = () => <h1>{ this.state.title }</h1>;
}

ReactDOM.render(<Layout />, document.getElementById('layout'));
