import R from 'ramda';

import API from 'api';
import { createSyncAction } from 'helpers/redux';


export const TYPES = {
    USERS_CREATE: 'USERS_CREATE',
    USERS_CREATED: 'USERS_CREATED',
    USERS_LIST: 'USERS_LIST',
    USERS_LIST_RECEIVED: 'USERS_LIST_RECEIVED',
    USERS_ITEM_RECEIVED: 'USERS_ITEM_RECEIVED',
    USERS_PATCH: 'USERS_PATCH',
    USERS_PATCHED: 'USERS_PATCHED',
    USERS_REMOVE: 'USERS_REMOVE',
    USERS_REMOVED: 'USERS_REMOVED',
    USERS_UPDATE: 'USERS_UPDATE',
    USERS_UPDATED: 'USERS_UPDATED',
};

// Sync actions creators
const ACTIONS = {
    LIST_RECEIVED: createSyncAction(TYPES.USERS_LIST_RECEIVED),
    CREATED: createSyncAction(TYPES.USERS_CREATED),
    ITEM_RECEIVED: createSyncAction(TYPES.USERS_ITEM_RECEIVED),
    PATCHED: createSyncAction(TYPES.USERS_PATCHED),
    REMOVED: createSyncAction(TYPES.USERS_REMOVED),
    UPDATED: createSyncAction(TYPES.USERS_UPDATED),
};

export default {

    ...ACTIONS,

    LIST:
        () =>
        (dispath) => (
            API.rest.users
                .list()
                .then((data) => dispath(ACTIONS.LIST_RECEIVED({ data })))
        ),

    CREATE:
        (src, onSuccess = R.identity) =>
        (dispath) => (
            API.rest.users
                .create(src)
                .then(
                    (data) => {
                        dispath(ACTIONS.CREATED({ data }))
                        return onSuccess(data);
                    }
                )
        ),

    PATCH:
        (src, body, onSuccess = R.identity) =>
        (dispath) => (
            Promise
                .all(
                    [].concat(src)
                        .map(({ id }) => API.rest.users.patch({ id, body }))
                )
                .then(
                    (data) => {
                        dispath(ACTIONS.PATCHED({ data }));
                        return onSuccess(data);
                    }
                )
        ),

    REMOVE:
        (src, onSuccess = R.identity) =>
        (dispath) =>
            Promise
                .all(
                    [].concat(src)
                      .map(
                          ({id}) =>
                            API.rest.users
                                .remove(id)()
                                .then(() => dispath(ACTIONS.REMOVED({ id })))
                        )
                )
                // .then(
                //     () => API.rest.users.list()
                // )
                .then((data) => {
                    onSuccess(data);
                    return data;
                }),

    UPDATE:
        ({id, ...body}, onSuccess = R.identity) =>
        (dispath) => (
            API.rest.users
                .update({ id, body })
                .then(
                    (data) => {
                        dispath(ACTIONS.UPDATED({ data }));
                        return onSuccess(data);
                    }
                )
        ),

    ITEM:
        (id) =>
        (dispath) => (
            +id
            ? API.rest.users
                .item(id)
                .then((data) => dispath(ACTIONS.ITEM_RECEIVED({ data })))
            : dispath(dispath(ACTIONS.ITEM_RECEIVED({ data: {} })))
        ),

};
