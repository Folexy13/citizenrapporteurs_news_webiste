import { userConstants } from "../../constant/userConstants";

export function categoryCrime(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_CRIME_REPORT_CATEGORY:
      return news;

    default:
      return state;
  }
}
