import ACTIONS from "../actions";
const initialState = {
    isAdmin: false,
    isLogged: false,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.IS_LOGGED:
            return {
                ...state,
                isLogged: action.payload,
            };
        case ACTIONS.IS_ADMIN:
            return {
                ...state,
                isAdmin: action.payload,
            };
        default:
            return state;
    }
};
export default authReducer;
