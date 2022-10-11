//import
import { alertActions } from "./alertAction";
import { userConstants } from "../../constant/userConstants";
import axios from "../../helpers/api";
const BASE_API_URL = "https://citizen-rapporteur-api.herokuapp.com";
export const newsAction = {
  postNews,
  postComment,
  getLatestNews,
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
function getLatestNews() {
  return (dispatch) => {
    axios
      .get(`${BASE_API_URL}/latest-news`)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: userConstants.GET_LATEST_NEWS,
            data: res.data?.news,
          });
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        dispatch(alertActions.error(err.message));
      });
  };
}
function postComment() {}
