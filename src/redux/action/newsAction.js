//import
import { alertActions } from "./alertAction";
import axios from "../../helpers/api";
const BASE_API_URL = "https://citizen-rapporteur-api.herokuapp.com";
export const newsAction = {
  postNews,
  postComment,
};

function postNews(payload) {
  return (dispatch) => {
    axios
      .post(`${BASE_API_URL}/create-news`, payload)
      .then((res) => {
        if (res.data.status) {
          dispatch(alertActions.success(res.data.message));
        } else {
          throw res.data.message;
        }
      })
      .catch((err) => {
        dispatch(alertActions.error(err));
      });
  };
}

function postComment() {}
