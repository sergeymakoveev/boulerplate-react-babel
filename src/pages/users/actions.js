import api from 'api/http';


export const TYPES = {
    USERS_SHOW: 'USERS_SHOW',
};


export const ACTIONS = {
    USERS_SHOW:
        (id) =>
            (dispath) => (
                +id
                ? api.users
                    .item(id)
                    .then((data) => dispath({ type: TYPES.USERS_SHOW, data }))
                : dispath({ type: TYPES.USERS_SHOW, data: {} })
            )
};


export default ACTIONS;
