import axios from 'axios';
import fp from 'lodash/fp';
import qs from 'qs';

import { saveAsFile, checkContentType, getContentDispositionFilename, isHasBody, CONTENT_TYPES } from './http-helpers';
import Errors from './errors';


const URL_BASE = '/api';
const BASIC = {
    username: 'default', password: 'secret',
};

const resolve = ({ response, saveAs }) => {
    const isContentType = checkContentType(response);
    const response_json = isContentType(CONTENT_TYPES.json) && response.data;
    const response_content = fp.get('content', response_json);
    switch (response.status) {
        case 200:
        case 201:
        case 202:
            return (
                saveAs
                    ? saveAsFile(
                        response,
                        getContentDispositionFilename(response, saveAs),
                    )
                    : (response_content || response_json || response)
            );
        case 204:
            return null;
        default:
            console.warn(`Unknown response status: ${response.status}\n`, response);
            return null;
    }
};


const reject = (response) => {
    switch (response.status) {
        case 401:
            throw new Errors.NotAuthorized(response);
        case 403:
            throw new Errors.Forbidden(response);
        case 400:
            throw new Errors.BadRequest(response);
        case 500:
            throw new Errors.Backend(response);
        // eslint-disable-next-line no-fallthrough
        default:
            throw new Errors.Unknown(response, response.data);
    }
};


const options = ({
    access_token,
    basic,
    body,
    content_type = CONTENT_TYPES.json,
    headers = {},
    method = 'POST',
    onDownloadProgress,
    onUploadProgress,
    path = '',
    query = {},
    responseType,
    token_type,
    url = (() => { throw new Error('Url is not specified'); })(),
}) => {
    const hasBody = isHasBody(method);
    const data = body && hasBody && (
        content_type === CONTENT_TYPES.json
            ? JSON.stringify(body)
            : content_type === CONTENT_TYPES.form
                ? qs.stringify(body)
                : body
    );
    const url_path = path ? `/${path}` : '';
    const url_query = qs.stringify({ ...query, ...!hasBody && body }, { arrayFormat: 'repeat' });
    const url_request = [URL_BASE, url, url_path, url_query ? '?' : '', url_query].join('');

    return {
        method,
        ...data && { data },
        ...basic && { auth: basic },
        headers: {
            Accept: CONTENT_TYPES.json,
            ...hasBody && { 'Content-Type': content_type },
            ...access_token && { Authorization: `${token_type} ${access_token}` },
            ...headers,
        },
        responseType,
        onUploadProgress,
        onDownloadProgress,
        url: url_request,
    };
};


const request = ({
    parent,
    reconnect = reject,
    saveAs,
    ...props
}) => (
    axios(options(props))
        .then(
            (response) => resolve({ response, saveAs }),
            parent
                ? reject
                : ({ response }) => (
                    response.status === 401
                        ? reconnect(
                            (tokens) => (
                                request({
                                    parent,
                                    saveAs,
                                    ...props,
                                    access_token: tokens.access_token,
                                    token_type: tokens.token_type,
                                })
                            )
                        )
                        : reject(response)
                )
        )
);


const connect = (props) => {
    const { reconnect } = props;
    const { access_token, refresh_token, token_type } = props.auth || {};

    const method =
        (name) => (args) =>
            request({ access_token, token_type, ...args, reconnect, method: name });

    const get = method('GET');
    const post = method('POST');
    const put = method('PUT');
    const patch = method('PATCH');
    const remove = method('DELETE');

    const crud = (url) => ({
        create: (body) => post({ url, body }),
        item: (id) => get({ url, path: id }),
        list: (query = {}) => get({ url, query }),
        patch: ({ id, body }) => patch({ url, path: id, body }),
        remove: (id) => remove({ url, path: id }),
        update: ({ id, body }) => put({ url, path: id, body }),
        download: (id, onDownloadProgress) => get({
            url,
            path: id,
            responseType: 'blob',
            onDownloadProgress,
            saveAs: `download-${id}.file`,
        }),
        upload: (files, onUploadProgress) =>
            window.Promise.all(
                files.map(
                    (file) => {
                        const body = new window.FormData();
                        body.append('file', file);
                        // console.warn({ file, data });
                        return post({
                            url,
                            path: 'upload',
                            content_type: CONTENT_TYPES.formdata,
                            onUploadProgress,
                            body,
                        });
                    }
                )
            ),
    });

    const auth = (url) => ({
        check: (token) => (
            get({
                url,
                basic: BASIC,
                path: 'check_token',
                query: { token },
            })
        ),
        reconnect: () => (
            post({
                url,
                parent: true,
                path: 'token',
                basic: BASIC,
                content_type: CONTENT_TYPES.form,
                body: { grant_type: 'refresh_token', refresh_token },
            })
        ),
        signin: ({ username, password }) => (
            post({
                url,
                path: 'token',
                basic: BASIC,
                content_type: CONTENT_TYPES.form,
                body: { grant_type: 'password', username, password },
            })
        ),
        signout: () => remove({ url, path: 'token' }),
    });

    // const dicts = (url) => ({
    //     registers: {
    //         stages: () => get({ url, path: 'registers/stages' })(),
    //         statuses: () => get({ url, path: 'registers/statuses' })(),
    //     },
    //     supplies: {
    //         rejectreasons: () => get({ url, path: 'supplies/rejectreasons' })(),
    //     },
    //     platformnodes: () => get({ url, path: 'registers/platformnodes' })(),
    // });


    const API = {
        get,
        remove,
        post,
        put,
        patch,
        auth: auth('/oauth'),
        // dicts: dicts('/dicts'),
        users: crud('/accounts'),
    };

    return API;
};


export default connect;
