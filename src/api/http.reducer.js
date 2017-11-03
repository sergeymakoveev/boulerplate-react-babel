import { TYPES } from './http.actions';


export const reducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.USERS_ITEM:
        case TYPES.USERS_ITEM_TEST:
            return { ...state, data: action.data };
        default:
            return state;
    }
}

export default reducer;
