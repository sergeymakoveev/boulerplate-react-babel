import * as R from 'ramda';

import api from './http';
import data from './data';



export const TYPES = {
    USERS_ITEM: 'USERS_ITEM',
    USERS_ITEM_TEST: 'USERS_ITEM_TEST',
};


export const ACTIONS = {
    USERS_ITEM:
        (id) =>
        (dispath) => (
            api.users
                .item( id )
                .then( (data) => dispath({ type: TYPES.USERS_ITEM, data }) )
            ),
    USERS_ITEM_TEST:
        (id) => ({
            type: TYPES.USERS_ITEM_TEST,
            data: R.find(R.propSatisfies((id_) => id == id_, 'id'), data().users)
        })
};


export default ACTIONS;
