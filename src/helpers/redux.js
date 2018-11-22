import fp from 'lodash/fp';


export const createSyncAction = (type) => (payload) => ({ type, ...payload });

export const update_ =
    (list) => (...args) => {
        const items = fp.flatten(args);
        return fp.map((i) => fp.find({ id: i.id }, items) || i)(list);
    };

export const add_ =
    (list) => (...args) => {
        const items = fp.flatten(args);
        return fp.pipe(
            update_(list),
            fp.concat(fp, fp.differenceBy('id', items, list))
        )(list);
    };

export const remove_ = (list) => (id) => fp.reject({ id }, list);
