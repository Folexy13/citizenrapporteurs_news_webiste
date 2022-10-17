import { userConstants } from "../../constant";

export function mainNews(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_MAIN_NEWS:
      return news;

    default:
      return state;
  }
}
