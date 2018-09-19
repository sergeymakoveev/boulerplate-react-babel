import qs from 'query-string';

function request(url) {
    return (path = '', query = {}) => {
        query = qs.stringify(query);
        query = query ? `?${query}` : '';
        path = path ? `/${path}` : '';
        return `${url}${path}${query}`;
    };
}

export const routes = {
    about: request('/about'),
    categories: request('/categories'),
    home: request('/'),
    topics: request('/topics'),
    users: request('/users'),
}

export default routes;
