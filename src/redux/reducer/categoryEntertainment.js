import { userConstants } from "../../constant/userConstants";

export function categoryEntertainmnet(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_ENTERTAINMENT_CATEGORY:
      return news;

    default:
      return state;
  }
}
