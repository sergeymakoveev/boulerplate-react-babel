import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/loading';
import { NavLink, Route, Switch } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';


const LoadablePageTopics = Loadable({
    loader: () => new Promise(
        (resolve) => setTimeout(() => resolve(import('~/pages/experiments/topics')), 3000)
    ),
    loading: Loading,
});
const LoadablePageCategories = Loadable({
    loader: () => import('~/pages/experiments/categories'),
    loading: Loading,
});

const LazyPage = React.lazy(() => import('~/pages/experiments/lazy'));
const renderPage = (Page) => () => (
    <React.Suspense fallback={<Loading />}>
        <Page />
    </React.Suspense>
);

const Page = ({ match }) => (
    <React.Fragment>
        <NavLink to={`${match.url}/loadable-categories`}>Loadable Categories</NavLink>
        <br />
        <NavLink to={`${match.url}/loadable-topics`}>Loadable Topics</NavLink>
        <br />
        <NavLink to={`${match.url}/lazy`}>React Lazy</NavLink>
        <hr />
        <Switch>
            <Route path={`${match.url}/loadable-categories`} component={LoadablePageCategories} />
            <Route path={`${match.url}/loadable-topics`} component={LoadablePageTopics} />
            <Route path={`${match.url}/lazy`} render={renderPage(LazyPage)} />
        </Switch>
    </React.Fragment>
);

Page.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

export default Page;
