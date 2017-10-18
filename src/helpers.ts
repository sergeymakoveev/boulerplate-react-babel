import * as R from 'ramda';

export const get =
    (data: {}) =>
    (path: string) => R.flip(R.path)(data, path.split('.'));
