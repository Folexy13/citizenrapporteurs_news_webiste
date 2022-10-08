//import
import axios from "../../helpers/api";
import { alertActions } from "./alertAction";
const BASE_API_URL = "https://citizen-rapporteur-api.herokuapp.com";
export const newAction = {
  postNews,
  postComment,
};

function postNews() {
  return (dispatch) => {
    axios
      .post(`${BASE_API_URL}/create-news`)
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
