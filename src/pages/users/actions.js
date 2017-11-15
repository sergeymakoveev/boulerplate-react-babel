import * as R from 'ramda';

import api from 'api/http';


export const TYPES = {
    USERS_CREATE: 'USERS_CREATE',
    USERS_LIST: 'USERS_LIST',
    USERS_ITEM: 'USERS_ITEM',
    USERS_REMOVE: 'USERS_REMOVE',
    USERS_UPDATE: 'USERS_UPDATE',
};


export const ACTIONS = {

    USERS_LIST:
        () =>
        (dispath) => (
            api.users
                .list()
                .then((data) => dispath({ type: TYPES.USERS_LIST, data }))
        ),

    USERS_CREATE:
        (src, onSuccess = R.identity) =>
        (dispath) => (
            api.users
                .create(src)
                .then(
                    (data) => {
                        dispath({ type: TYPES.USERS_CREATE, data });
                        return onSuccess(data);
                    }
                )
        ),

    USERS_REMOVE:
        (src, onSuccess = R.identity) =>
        (dispath) =>
            Promise
                .all(
                    [].concat(src)
                      .map(({id}) => api.users.remove(id)())
                )
                // .then(
                //     () => api.users.list()
                // )
                .then((data) => {
                    dispath({ type: TYPES.USERS_REMOVE, data });
                    onSuccess(data);
                    return data;
                }),

    USERS_UPDATE:
        (src, onSuccess = R.identity) =>
        (dispath) => (
            api.users
                .update(src.id)(src)
                .then(
                    (data) => {
                        dispath({ type: TYPES.USERS_UPDATE, data });
                        return onSuccess(data);
                    }
                )
        ),

    USERS_ITEM:
        (id) =>
        (dispath) => (
            +id
            ? api.users
                .item(id)
                .then((data) => dispath({ type: TYPES.USERS_ITEM, data }))
            : dispath({ type: TYPES.USERS_ITEM, data: {} })
        ),

};


export default ACTIONS;
