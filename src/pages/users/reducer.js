import * as R from 'ramda';
import { TYPES } from './actions';


export const reducer = (state = {}, action) => {
    const { type, data, id } = action;
    const { list } = state;
    switch (type) {
        case TYPES.USERS_CREATED:
        case TYPES.USERS_ITEM_RECEIVED:
        case TYPES.USERS_PATCHED:
        case TYPES.USERS_UPDATEED:
            return { ...state, item: data };
        case TYPES.USERS_LIST_RECEIVED:
            return { ...state, list: data };
        case TYPES.USERS_REMOVED:
            return { ...state, list: R.reject(R.propEq('id', id), list) };
        default:
            return state;
    }
}

export default reducer;
