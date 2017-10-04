import './index.html';
import './index.scss';

// import * as R from 'ramda';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, /* RouteComponentProps, */ Switch } from 'react-router-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// import DATA from 'data.json';
import Topics from 'pages/topics';

injectTapEventPlugin();

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


/*
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
*/

const Login: React.StatelessComponent<{}> = () => (
    <FlatButton label="Login" />
);


const Menu: React.StatelessComponent<{}> = () => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);


class Layout extends React.Component<{}, {}> {

    public state = {
        drawer: false,
        logged: true,
        title: 'React-Typescript boulerplate'
    };

    public toggleDrawer() {
        this.setState({ drawer: !this.state.drawer });
    }

    constructor( props: React.Props<{}> ) {
        super( props );
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    // componentDidMount() {
    // }

    public render(): JSX.Element {
        return (
            <Router>
                <div>
                    <AppBar
                        title={this.state.title}
                        iconElementRight={this.state.logged ? <Menu /> : <Login />}
                        onLeftIconButtonTouchTap={ this.toggleDrawer }
                    />
                    <Drawer
                        docked={false}
                        open={this.state.drawer}
                        onRequestChange={ this.toggleDrawer }
                    >
                        <AppBar
                            iconElementLeft={<span />}
                            iconElementRight={<IconButton><NavigationMenu /></IconButton>}
                            onRightIconButtonTouchTap={ this.toggleDrawer }
                        />
                        <NavLink to={'/'} exact={true} ><MenuItem>Home</MenuItem></NavLink>
                        <NavLink to={'/about'}><MenuItem>About</MenuItem></NavLink>
                        <NavLink to={'/topics'}><MenuItem>Topics</MenuItem></NavLink>
                    </Drawer>
                    <h1>{this.state.title}</h1>
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


ReactDOM.render(
    <MuiThemeProvider><Layout /></MuiThemeProvider>,
    document.getElementById('layout')
);
