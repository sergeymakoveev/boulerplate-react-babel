import './index.html';
import './index.scss';

import * as R from 'ramda';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, RouteComponentProps } from 'react-router-dom';

const Home: React.StatelessComponent<{}> = () => (
    <div>
        <h2>Home</h2>
    </div>
);


const About: React.StatelessComponent<{}> = () => (
    <div>
        <h2>About</h2>
    </div>
);


const Topic: React.StatelessComponent<RouteComponentProps<{}>> = ({ match }) => (
    <div>
        <h3>{R.prop('topicId', match.params)}</h3>
    </div>
);


const Topics: React.StatelessComponent<RouteComponentProps<{}>> = ({ match }) => (
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
    </div>
);


class Layout extends React.Component<{}, {}> {

    state = {
        title: 'React-Babel boulerplate',
    };

    // constructor( props ){
    //     super( props );
    // };

    // componentDidMount() {
    // }

    render(): JSX.Element {
        return (
            <Router basename={'/ts'}>
                <div>
                    <h1>{this.state.title}</h1>
                    <ul>
                        <li>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={'/about'}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to={'/topics'}>
                                Topics
                            </Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                        <Route
                            path="*"
                            render={
                                ({ location: {} }): React.ReactNode => (
                                    <h3>404: {location.pathname}</h3>
                                )
                            }
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<Layout />, document.getElementById('layout'));
