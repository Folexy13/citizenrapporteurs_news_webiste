import { userConstants } from "../../constant/userConstants";

export function clickedNews(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_CLICKED_NEWS:
      return news;
    default:
      return state;
  }
}
