import { userConstants } from "../../constant/userConstants";

export function categoryNews(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_NEWS_CATEGORY:
      return news;

    default:
      return state;
  }
}
