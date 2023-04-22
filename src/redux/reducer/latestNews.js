import { userConstants } from "../../constant/userConstants";

export function latestNews(state = [], action) {
  const { type, data } = action;
  switch (type) {
    case userConstants.GET_LATEST_NEWS:
      return data;

    default:
      return state;
  }
}
