import { combineReducers } from "redux";
import { alert } from "./alertReducer";
const appReducer = combineReducers({
  alert,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
