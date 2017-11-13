import api from 'api/http';


export const TYPES = {
    USERS_CREATE: 'USERS_CREATE',
    USERS_LIST: 'USERS_LIST',
    USERS_ITEM: 'USERS_ITEM',
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
        (src) =>
        (dispath) => (
            api.users
                .create(src)
                .then((data) => dispath({ type: TYPES.USERS_CREATE, data }))
        ),

    USERS_UPDATE:
        (id, src) =>
        (dispath) => (
            api.users
                .update(id)(src)
                .then(
                    (data) => {
                        dispath({ type: TYPES.USERS_UPDATE, data });
                        dispath(ACTIONS.USERS_LIST);
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
