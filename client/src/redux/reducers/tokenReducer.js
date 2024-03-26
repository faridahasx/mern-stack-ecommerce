import ACTIONS from "../actions";
const token = {
    accessToken: "",
    date: "",
};
const tokenReducer = (state = token, action) => {
    switch (action.type) {
        case ACTIONS.GET_TOKEN:
            return {
                accessToken: action.payload,
                date: Date.now(),
            };
        default:
            return state;
    }
};
export default tokenReducer;
