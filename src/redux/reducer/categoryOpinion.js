import { userConstants } from "../../constant/userConstants";

export function categoryOpinion(state = [], action) {
  const { type, news } = action;
  switch (type) {
    case userConstants.GET_OPINION_CATEGORY:
      return news;

    default:
      return state;
  }
}
