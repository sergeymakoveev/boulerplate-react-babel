import * as R from 'ramda';
import { TYPES } from './actions';


export const reducer = (state = {}, action) => {
    const { data, id } = action;
    const { list } = state;
    switch (action.type) {
        case TYPES.USERS_CREATE:
        case TYPES.USERS_ITEM:
        case TYPES.USERS_PATCH:
        case TYPES.USERS_UPDATE:
            return { ...state, item: data };
        case TYPES.USERS_LIST:
            return { ...state, list: data };
        case TYPES.USERS_REMOVE:
            return { ...state, list: R.reject(R.propEq('id', id), list) };
        default:
            return state;
    }
}

export default reducer;
