import fp from 'lodash/fp';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';


const Item = ({ match }) => (
    <div>
        <h3>{fp.get('params.id', match.params)}</h3>
    </div>
);
Item.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};


class List extends React.PureComponent {
    static propTypes = {
        match: ReactRouterPropTypes.match.isRequired,
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <h2>Items</h2>
                <ul>
                    <li>
                        <Link to={`${match.url}/item1`}>
                            Item 1
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/item2`}>
                            Item 2
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/item3`}>
                            Item 3
                        </Link>
                    </li>
                </ul>
                <Route
                    path={`${match.url}/:id`}
                    component={Item}
                />
                <Route
                    exact
                    path={match.url}
                    render={() => <h3>Please select a item.</h3>}
                />
            </div>
        );
    }
}


export default List;
