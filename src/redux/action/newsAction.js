//import
import { alertActions } from "./alertAction";
import { userConstants } from "../../constant/userConstants";
// import axios from "../../helpers/api";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
export const BASE_API_URL = "https://cr-news-api.herokuapp.com";
// const BASE_API_URL = "http://localhost:8080";
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
  getClickedNews,
  login,
  postClickedNews,
  editNews,
  deleteNews,
};
function login(payload) {
  return (dispatch) => {
    axios
      .post(`${BASE_API_URL}/login`, payload)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("token", res.data.token);
          dispatch(alertActions.success(res.data.message));
        } else {
          throw res.data.message;
        }
      })
      .catch((e) => {
        dispatch(alertActions.error(e));
      });
  };
}
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
function editNews(id) {
  return (dispatch) => {
    axios
      .put(`${BASE_API_URL}/edit-news/${id}`)
      .then((res) => {
        if (res.data.status) {
          dispatch(alertActions.success(res.data.message));
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        dispatch(alertActions.error(err.message));
      });
  };
}
function deleteNews(id) {
  return (dispatch) => {
    axios
      .delete(`${BASE_API_URL}/delete-news/${id}`)
      .then((res) => {
        if (res.data.status) {
          dispatch(alertActions.success(res.data.message));
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        dispatch(alertActions.error(err.message));
      });
  };
}

function getLatestNews() {
  return (dispatch) => {
    trackPromise(
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
        })
    );
  };
}
function getSingleNews(payload) {
  return (dispatch) => {
    trackPromise(
      axios.post(`${BASE_API_URL}/single-news`, payload).then((res) => {
        localStorage.setItem("newsID", res.data.news._id);
        dispatch({
          type: userConstants.GET_SINGLE_NEWS,
          news: res.data.news,
        });
      })
    );
  };
}
function postComment() {}
function getNewsCategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_NEWS_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getPoliticsategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_POLITICS_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getBusinessCategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_BUSINESS_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getSportCategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_SPORT_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getCrimeCategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_CRIME_REPORT_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getOpinionCategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_OPINION_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getEntertainmentCategory(slug) {
  return (dispatch) => {
    trackPromise(
      axios.get(`${BASE_API_URL}/news/?category=${slug}`).then((res) => {
        dispatch({
          type: userConstants.GET_ENTERTAINMENT_CATEGORY,
          news: res.data.news,
        });
      })
    );
  };
}
function getClickedNews() {
  return (dispatch) => {
    axios.get(`${BASE_API_URL}/clicked-news`).then((res) => {
      dispatch({
        type: userConstants.GET_CLICKED_NEWS,
        news: res.data.clickedNews,
      });
    });
  };
}
function postClickedNews(payload) {
  return (dispatch) => {
    axios.post(`${BASE_API_URL}/clicked-news`, payload).then((res) => {
      console.log(res.data.message);
    });
  };
}
