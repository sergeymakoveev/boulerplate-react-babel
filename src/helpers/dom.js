import fp from 'lodash/fp';


export const stopPropagation =
    (handler) =>
        (e) => {
            fp.isFunction(e.stopPropagation)
                && e.stopPropagation();
            return handler(e);
        };
