import ACTIONS from "../actions";

const token = {
  accessToken: "",
  date: "",
};

type Action = {
  type: "GET_TOKEN";
  payload: string;
};

const tokenReducer = (state = token, action: Action) => {
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
