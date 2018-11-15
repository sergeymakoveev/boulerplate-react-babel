import { TYPES } from './actions';


const reducer = (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case TYPES.AUTH_SIGNEDIN:
            return { ...data };
        case TYPES.AUTH_SIGNEDOUT:
            return {};
        default:
            return state;
    }
};

export default reducer;
