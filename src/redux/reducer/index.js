import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { latestNews } from "./latestNews";
const appReducer = combineReducers({
  alert,
  latestNews,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
