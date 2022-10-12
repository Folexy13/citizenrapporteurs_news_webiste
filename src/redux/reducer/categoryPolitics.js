import { userConstants } from "../../constant/userConstants";

export function categoryPolitics(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_POLITICS_CATEGORY:
      return news;

    default:
      return state;
  }
}
