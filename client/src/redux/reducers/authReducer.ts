import ACTIONS from "../actions";

interface IState {
  isAdmin: boolean | null;
  isLogged: boolean | null;
}

interface IsLoggedAction {
  type: "IS_LOGGED";
  payload: boolean;
}

interface IsAdminAction {
  type: "IS_ADMIN";
  payload: boolean;
}

const initialState: IState = {
  isAdmin: null,
  isLogged: null,
};

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
