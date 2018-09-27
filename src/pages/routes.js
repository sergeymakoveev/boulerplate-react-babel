import qs from 'query-string';


function request(url) {
    return (path = '', query = {}) => {
        const query_string = qs.stringify(query);
        return `${url}${path ? `/${path}` : ''}${query_string ? `?${query_string}` : ''}`;
    };
}

export const routes = {
    about: request('/about'),
    categories: request('/categories'),
    home: request('/'),
    topics: request('/topics'),
    users: request('/users'),
};

export default routes;
