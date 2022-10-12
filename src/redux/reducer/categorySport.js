import { userConstants } from "../../constant/userConstants";

export function categorySport(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_SPORT_CATEGORY:
      return news;

    default:
      return state;
  }
}
