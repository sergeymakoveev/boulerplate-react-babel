import qs from 'qs';
import axios from 'axios';

import { saveAsFile, checkContentType, getContentDispositionFilename, isHasBody, CONTENT_TYPES } from './http-helpers';
import { NotAuthorizedError, ForbiddenError, UnknownError } from './errors';


const URL_BASE = '/api';

const request__ = ({ auth }) =>
    ({
        url = (() => { throw new Error('Url is not specified'); })(),
        path = '',
        query = {},
        method = 'POST',
        headers = {},
        contentType = CONTENT_TYPES.json,
        responseType,
        onUploadProgress,
        onDownloadProgress,
    }) =>
        ({ body, saveAs } = {}) => {
            const { access_token, token_type } = auth;
            const hasBody = isHasBody(method);
            const data = body && hasBody && (
                contentType === CONTENT_TYPES.json
                    ? JSON.stringify(body)
                    : body
            );
            const url_path = path ? `/${path}` : '';
            const url_query = qs.stringify({ ...query, ...!hasBody && body }, { arrayFormat: 'repeat' });
            const url_request = [URL_BASE, url, url_path, url_query ? '?' : '', url_query].join('');

            const request = {
                method,
                ...data && { data },
                headers: {
                    Accept: CONTENT_TYPES.json,
                    ...hasBody && { 'Content-Type': contentType },
                    ...access_token && { Authorization: `${token_type} ${access_token}` },
                    ...headers,
                },
                responseType,
                onUploadProgress,
                onDownloadProgress,
                url: url_request,
            };

            const resolve = (response) => {
                const isContentType = checkContentType(response);
                const response_json = isContentType(CONTENT_TYPES.json) && response.data;
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
                                : (response_json || response)
                        );
                    case 204:
                        return null;
                    case 401:
                        throw new NotAuthorizedError(response);
                    case 403:
                        throw new ForbiddenError(response);
                    case 400:
                    case 500:
                        if (response_json
                            && response_json.Message) {
                            throw new Error(
                                response_json.Message
                            );
                        }
                    // eslint-disable-next-line no-fallthrough
                    default:
                        console.error('Unexpected HTTP response', response);
                        throw new UnknownError(response, response.data);
                }
            };

            // let response;
            // try {
            //     response = await axios(request);
            // } catch (error) {
            //     response = error.response;
            // }

            return (
                axios(request)
                    .then(resolve, ({ response }) => resolve(response))
            );
        };

const API = (props) => {
    const request_ = request__(props);

    const method =
        (name) => (args) =>
            request_({ ...args, method: name });

    const get = method('GET');
    const post = method('POST');
    const put = method('PUT');
    const patch = method('PATCH');
    const remove = method('DELETE');

    const crud = (url) => ({
        create: (body) => post({ url })({ body }),
        item: (id) => get({ url, path: id })(),
        list: (query = {}) => get({ url, query })(),
        patch: ({ id, body }) => patch({ url, path: id })({ body }),
        remove: (id) => remove({ url, path: id })(),
        update: ({ id, body }) => put({ url, path: id })({ body }),
        download: (id, onDownloadProgress) => get({
            url,
            path: id,
            responseType: 'blob',
            onDownloadProgress,
        })({ saveAs: `download-${id}.file` }),
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
                            contentType: CONTENT_TYPES.formdata,
                            onUploadProgress,
                        })({ body });
                    }
                )
            ),
    });

    const auth = (url) => ({
        signin: ({ login, password }) => post({ url, path: 'signin' })({ body: { login, password } }),
        signout: () => get({ url, path: 'signout' })(),
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


    return {
        get: (args) => get(args)(args),
        remove: (args) => remove(args)(args),
        post: (args) => post(args)(args),
        put: (args) => put(args)(args),
        patch: (args) => patch(args)(args),
        auth: auth('/auth'),
        // dicts: dicts('/dicts'),
        users: crud('/users'),
    };
};


export default API;
