import ACTIONS from "../actions";

const transition = {
  isTransitioning: false,
};

type Action = {
  type: "TRANSITION";
  payload: boolean;
};

const transitionReducer = (state = transition, action: Action) => {
  switch (action.type) {
    case ACTIONS.TRANSITION:
      return {
        isTransitioning: action.payload,
      };
    default:
      return state;
  }
};

export default transitionReducer;
