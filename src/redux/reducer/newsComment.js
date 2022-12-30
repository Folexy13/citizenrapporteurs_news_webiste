import { userConstants } from "../../constant/userConstants";

export function newsComment(state = [], action) {
  const { type, comments } = action;
  switch (type) {
    case userConstants.GET_NEWS_COMMENTS:
      return comments;

    default:
      return state;
  }
}
