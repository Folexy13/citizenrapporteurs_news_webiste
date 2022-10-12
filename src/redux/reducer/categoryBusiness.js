import { userConstants } from "../../constant/userConstants";

export function categoryBusiness(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_BUSINESS_CATEGORY:
      return news;

    default:
      return state;
  }
}
