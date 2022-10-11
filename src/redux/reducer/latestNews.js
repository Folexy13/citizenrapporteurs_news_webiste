import { userConstants } from "../../constant/userConstants";

export function latestNews(state = [], action) {
  const { type } = action;
  switch (type) {
    case userConstants.GET_LATEST_NEWS:
      return action.data;

    default:
      return state;
  }
}
