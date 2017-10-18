import * as fetch from 'isomorphic-fetch';
import * as qs from 'query-string';
import { ResponseInterface, UserResponseInterface, UsersResponseInterface } from './http.interfaces';

type HttpRequest<T> = (options?: {}) => Promise<T>;

const
    BASE = '/api';


function request(url: string) {
    return (args: {path: string, query: {}} = {path: '', query: {}}) => {
        // tslint:disable-next-line:prefer-const
        let { path, query, ...options } = args;
        query = qs.stringify(query);
        query = query ? `?${query}` : '';
        path = path ? `/${path}` : '';
        return fetch(
            `${BASE}${url}${path}${query}`,
            options
        ).then((response) => response.json());
    };
}

function get<T>(r: HttpRequest<T>) {
    return r;
}

function post<T>(r: HttpRequest<T>) {
    return (body: {}) => r({ body, method: 'POST' });
}

function update<T>(r: HttpRequest<T>) {
    return (body: {}) => r({ body, method: 'UPDATE' });
}

function remove<T>(r: HttpRequest<T>) {
    return () => r({ method: 'DELETE' });
}

const REQUESTS = {
    users: request('/users')
};

const
    usersCreate: HttpRequest<UserResponseInterface> = post(REQUESTS.users),
    usersItem: HttpRequest<UserResponseInterface> = get(REQUESTS.users),
    usersList: HttpRequest<UsersResponseInterface> = get(REQUESTS.users),
    usersRemove: HttpRequest<ResponseInterface> = remove(REQUESTS.users),
    usersUpdate: HttpRequest<UserResponseInterface> = update(REQUESTS.users);

export const users = {
    create: usersCreate,
    item: (id: number) => usersItem({ path: `${id}` }),
    list: (query?: {}) => usersList({ query }),
    remove: usersRemove,
    update: usersUpdate
};
