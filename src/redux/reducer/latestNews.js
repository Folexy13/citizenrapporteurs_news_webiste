import { userConstants } from "../../constant/userConstants";

export function latestNews(state = [], action) {
  const { type, data } = action;
  console.log(data);
  switch (type) {
    case userConstants.GET_LATEST_NEWS:
      return data;

    default:
      return state;
  }
}
