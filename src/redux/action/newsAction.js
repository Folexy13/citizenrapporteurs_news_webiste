//import
import { alertActions } from "./alertAction";
import { userConstants } from "../../constant/userConstants";
import axios from "../../helpers/api";
const BASE_API_URL = "https://citizen-rapporteur-api.herokuapp.com";
export const newsAction = {
  postNews,
  postComment,
  getLatestNews,
  getNewsCategory,
  getSingleNews,
  getBusinessCategory,
  getCrimeCategory,
  getEntertainmentCategory,
  getOpinionCategory,
  getPoliticsategory,
  getSportCategory,
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
function getSingleNews(id) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/getSingleNews/${id}`).then((res) => {
      dispatch({
        type: userConstants.GET_SINGLE_NEWS,
        news: res.data.news,
      });
    });
  };
}
function postComment() {}
function getNewsCategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_NEWS_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
function getPoliticsategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_POLITICS_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
function getBusinessCategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_BUSINESS_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
function getSportCategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_SPORTS_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
function getCrimeCategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_CRIME_REPORT_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
function getOpinionCategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_OPINION_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
function getEntertainmentCategory(slug) {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
      dispatch({
        type: userConstants.GET_ENTERTAINMENT_CATEGORY,
        news: res.data.news,
      });
    });
  };
}
