import { TYPES } from './actions';


export const reducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.USERS_CREATE:
        case TYPES.USERS_ITEM:
        case TYPES.USERS_UPDATE:
            return { ...state, item: action.data };
        case TYPES.USERS_LIST:
            return { ...state, list: action.data };
        default:
            return state;
    }
}

export default reducer;
