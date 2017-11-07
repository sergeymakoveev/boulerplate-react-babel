import { TYPES } from './actions';


export const reducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.USERS_SHOW:
            return { ...state, show: action.data };
        default:
            return state;
    }
}

export default reducer;
