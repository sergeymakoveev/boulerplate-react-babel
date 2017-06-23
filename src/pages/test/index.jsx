import './index.html';
import './index.scss';


import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {

    state = {
        title: 'test react success',
    };

    // constructor( props ){
    //     super( props );
    // };

    // componentDidMount() {
    // }

    click = () =>
        this.setState({ title: `${this.state.title} click`})

    render = () => (
        <button onClick={ this.click }>
            { this.state.title }
        </button>
    );
}

ReactDOM.render(<Layout />, document.getElementById('test-react'));
