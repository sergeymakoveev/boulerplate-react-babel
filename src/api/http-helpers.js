import fp from 'lodash/fp';
import { saveAs } from 'file-saver';


export const CONTENT_TYPES = {
    json: 'application/json',
    formdata: 'multipart/form-data',
    form: 'application/x-www-form-urlencoded',
    patch: 'application/merge-patch+json',
};

export const saveAsFile = fp.curry(
    (response, filename) =>
        saveAs(response.data, filename)
);

export const checkContentType = fp.curry(
    (response, contentType) =>
        !!~(fp.split('; ', response.headers['content-type'])[0] || '')
            .toLowerCase()
            .indexOf(contentType)
);

export const isHasBody = (method) => ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());

export const getContentDispositionFilename = fp.curry(
    (response, fallback) => (
        fp.pipe(
            fp.defaultTo(''),
            fp.split(';'),
            fp.map(fp.trim),
            fp.find((v) => /^filename=/i.test(v)),
            fp.split('='),
            fp.last,
            fp.defaultTo(fallback),
        )(response.headers['content-disposition'])
    )
);
