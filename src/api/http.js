import fetch from 'isomorphic-fetch';
import qs from 'query-string';



const
    BASE = '/api',
    headers = {'Content-Type': 'application/json'};

export const routes = {
    authorise: '/authorise',
    users: '/users',
}

function request(url) {
    return ({path='', query={}, ...options}) => {
        query = qs.stringify(query);
        query = query ? `?${query}` : '';
        path = path ? `/${path}` : '';
        return fetch(
            `${BASE}${url}${path}${query}`,
            options
        ).then((response) => response.json());
    };
}

function post(r) {
    return (body) => r({ body, headers, method: 'POST' });
}

function update(r) {
    return (body) => r({ body, headers, method: 'PUT' });
}

function remove(r) {
    return () => r({ method: 'DELETE' });
}

const REQUESTS = {
    authorise: request(routes.authorise),
    users: request(routes.users),
};

const
    usersCreate = post(REQUESTS.users),
    usersItem = REQUESTS.users,
    usersList = REQUESTS.users,
    usersRemove = remove(REQUESTS.users),
    usersUpdate = update(REQUESTS.users);

export const users = {
    create: usersCreate,
    item: (path) => usersItem({ path }),
    list: (query) => usersList({ query }),
    remove: usersRemove,
    update: usersUpdate
};

export const authorise = update(REQUESTS.authorise);

export const api = {
    authorise, users, routes
};

export default api;
