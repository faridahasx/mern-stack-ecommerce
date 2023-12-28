import ACTIONS from "../actions";

const initialState = {
  isAdmin: false,
  isLogged: false,
};

interface IsLoggedAction {
  type: "IS_LOGGED";
  payload: boolean;
}

interface IsAdminAction {
  type: "IS_ADMIN";
  payload: boolean;
}

type Action = IsLoggedAction | IsAdminAction;

const authReducer = (state = initialState, action: Action) => {
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
