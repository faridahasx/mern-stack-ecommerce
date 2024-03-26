import ACTIONS from "../actions";
const alert = {
    error: "",
    success: "",
};
const alertReducer = (state = alert, action) => {
    switch (action.type) {
        case ACTIONS.ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ACTIONS.SUCCESS:
            return {
                ...state,
                success: action.payload,
            };
        default:
            return state;
    }
};
export default alertReducer;
