import * as R from 'ramda';
import * as React from 'react';
import { Link, Route, RouteComponentProps } from 'react-router-dom';

// import DATA from 'data.json';
import * as DATA from './data.json';


const Topic: React.StatelessComponent<RouteComponentProps<{}>> = ({ match }) => (
    <div>
        <h3>{R.prop('topicId', match.params)}</h3>
    </div>
);

const Topics: React.StatelessComponent<RouteComponentProps<{}>> = ({ match }) => (
    <div>
        <h2>Topics</h2>
        {DATA}
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
    </div>
);

export default Topics;
