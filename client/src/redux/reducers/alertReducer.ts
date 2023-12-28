import ACTIONS from "../actions";

const alert = {
  error: "",
  success: "",
};

interface SuccessAction {
  type: "SUCCESS";
  payload: string;
}

interface ErrorAction {
  type: "ERROR";
  payload: string;
}

type Action = SuccessAction | ErrorAction;

const alertReducer = (state = alert, action: Action) => {
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
