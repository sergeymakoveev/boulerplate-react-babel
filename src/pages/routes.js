import qs from 'qs';


function request(url) {
    return (path = '', query = {}) => {
        const query_string = qs.stringify(query);
        return `${url}${path ? `/${path}` : ''}${query_string ? `?${query_string}` : ''}`;
    };
}

export const routes = {
    home: request('/'),
    about: request('/about'),
    users: request('/users'),
};

export default routes;
