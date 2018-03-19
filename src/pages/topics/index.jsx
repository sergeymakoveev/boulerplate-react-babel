import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import { Link, Route } from 'react-router-dom';

// import DATA from 'data.json';
// import * as DATA from './data.json';



class Topic extends React.PureComponent {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <h3>{R.prop('topicId', match.params)}</h3>
            </div>
        );
    }

}


class Topics extends React.PureComponent {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>
                            Rendering with React
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>
                            Components
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>
                            Props v. State
                        </Link>
                    </li>
                </ul>
                <Route
                    path={`${match.url}/:topicId`}
                    component={Topic}
                />
                <Route
                    exact={true}
                    path={match.url}
                    render={() => <h3>Please select a topic.</h3>}
                />
                <Route
                    exact={true}
                    path={`${match.url}/components`}
                    render={() => <h3>COMPONENTS!!!</h3>}
                />
            </div>
        );
    }
}


export default Topics;
