import * as R from 'ramda';
import fp from 'lodash/fp';


export const path =
    (data) =>
        (p) => R.flip(R.path)(data, p.split('.'));

export const stopPropagation =
    (handler) =>
        (e) => {
            fp.isFunction(e.stopPropagation)
                && e.stopPropagation();
            return handler(e);
        };


export default {
    path, stopPropagation,
};
