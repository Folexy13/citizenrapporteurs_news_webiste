import { userConstants } from "../../constant/userConstants";

export function singleNews(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_SINGLE_NEWS:
      return news;

    default:
      return state;
  }
}
