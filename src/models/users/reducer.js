import fp from 'lodash/fp';
import { add_, update_, remove_ } from 'helpers/redux';
import { TYPES } from './actions';


const reducer = (state = {}, action) => {
    const { type, data, id } = action;
    const { list } = state;
    const add = add_(list);
    const update = update_(list);
    const remove = remove_(list);
    switch (type) {
        case TYPES.USERS_ITEM_RECEIVED:
            return { ...state, item: data };
        case TYPES.USERS_ITEM_RESETTED:
            return fp.omit(['item'], state);
        case TYPES.USERS_UPDATED:
        case TYPES.USERS_PATCHED:
            return { ...state, list: update(data) };
        case TYPES.USERS_CREATED:
        case TYPES.USERS_LIST_RECEIVED:
            return { ...state, list: add(data) };
        case TYPES.USERS_REMOVED:
            return { ...state, list: remove(id) };
        case TYPES.USERS_LIST_RESETTED:
            return fp.omit(['list'], state);
        default:
            return state;
    }
};

export default reducer;
