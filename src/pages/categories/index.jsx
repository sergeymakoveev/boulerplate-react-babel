import PropTypes from 'prop-types';
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

// import DATA from 'data.json';
// import * as DATA from './data.json';



class Category extends React.PureComponent {

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


class Categories extends React.PureComponent {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        console.warn('Result props', this.props);

        const { match } = this.props;
        return (
            <div>
                <h2>Categories</h2>
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
                    component={Category}
                />
                <Route
                    exact={true}
                    path={match.url}
                    render={() => <h3>Please select a category.</h3>}
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

export default
    connect(
        (state, props) => {
            console.warn('mapStateToProps', {state, props});
            return { a:1, b:2 };
        },
        // bind account loading action creator
        (dispath, props) => {
            console.warn('mapDispatchToProps', { dispath, props });
            return { c: 3, d: 4 };
        }
    )(Categories);
