import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import alert from "./alertReducer";
import transition from "./transitionReducer";

export default combineReducers({
  auth,
  token,
  alert,
  transition,
});
