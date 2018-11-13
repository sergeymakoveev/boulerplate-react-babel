import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/loading';
import { NavLink, Route, Switch } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';


const LoadablePageTopics = Loadable({
    loader: () => new Promise((resolve) => setTimeout(() => resolve(import('pages/experiments/topics')), 3000)),
    loading: Loading,
});
const LoadablePageCategories = Loadable({
    loader: () => import('pages/experiments/categories'),
    loading: Loading,
});


const Page = ({ match }) => (
    <React.Fragment>
        <NavLink to={`${match.url}/categories`}>Categories</NavLink>
        <br />
        <NavLink to={`${match.url}/topics`}>Topics</NavLink>
        <hr />
        <Switch>
            <Route path={`${match.url}/categories`} component={LoadablePageCategories} />
            <Route path={`${match.url}/topics`} component={LoadablePageTopics} />
        </Switch>
    </React.Fragment>
);

Page.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

export default Page;
