import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { latestNews } from "./latestNews";
import { singleNews } from "./singleNews";
import { categoryNews } from "./categoryNews";
import { categoryOpinion } from "./categoryOpinion";
import { categoryBusiness } from "./categoryBusiness";
import { categorySport } from "./categorySport";
import { categoryCrime } from "./categroyCrime";
import { categoryEntertainmnet } from "./categoryEntertainment";
import { categoryPolitics } from "./categoryPolitics";
const appReducer = combineReducers({
  alert,
  latestNews,
  singleNews,
  categoryNews,
  categoryPolitics,
  categoryBusiness,
  categoryEntertainmnet,
  categoryOpinion,
  categorySport,
  categoryCrime,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
