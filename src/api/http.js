import fetch from 'isomorphic-fetch';
import qs from 'query-string';



const
    BASE = '/api',
    headers = {'Content-Type': 'application/json'};

const request =
    (url) =>
    (options={}) =>
    ({path='', query={}}={}) =>
    (data) => {
        const body = JSON.stringify(data);
        query = qs.stringify(query);
        query = query ? `?${query}` : '';
        path = path ? `/${path}` : '';
        return (
            fetch(
                `${BASE}${url}${path}${query}`,
                {
                    ...options,
                    ...(body ? { body } : {})
                }
            ).then((response) => response.json())
        );
    };

function get(r) {
    return r();
}

function post(r) {
    return r({ headers, method: 'POST' });
}

function update(r) {
    return r({ headers, method: 'PUT' });
}

function remove(r) {
    return r({ method: 'DELETE' });
}

const requests = {
    authorise: request('/authorise'),
    users: request('/users'),
};

export const users = {
    create: post(requests.users)(),
    item: (id) => get(requests.users)({ path: id })(),
    list: (query) => get(requests.users)({ query })(),
    remove: (id) => remove(requests.users)({ path: id }),
    update: (id) => update(requests.users)({ path: id }),
};

export const authorise = update(requests.authorise);

export const api = {
    authorise, users
};

export default api;
