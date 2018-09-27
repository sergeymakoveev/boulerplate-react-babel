import * as R from 'ramda';


export const path =
    (data) =>
        (p) => R.flip(R.path)(data, p.split('.'));

export default {
    path,
};
