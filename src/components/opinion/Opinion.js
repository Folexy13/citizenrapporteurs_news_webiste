import React, { useEffect } from "react";
import "./opinion.scss";
import { NewImage } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { newsAction } from "../../redux/action/newsAction";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { convertToSlug } from "../entertainment/Entertainment";
import { getNewsClicks } from "../card/Card";

function Opinion({ type }) {
  const dispatch = useDispatch();
  let store;
  const news = useSelector((el) => el?.mainNews);
  const clickedNews = useSelector((el) => el?.clickedNews);
  const formatDate = (date) => {
    date = moment(date).format("LL");
    return date;
  };
  const handleClicks = (id) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          id,
          ip: data.ip,
        };
        dispatch(newsAction.postClickedNews(payload));
        dispatch(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  store = useSelector((el) => el?.categoryNews);
  useEffect(() => {
    dispatch(newsAction.getNewsCategory(news?.slug));
  }, [dispatch, news]);
  if (type === "main") {
    return (
      <>
        {store?.length > 1 && (
          <div className="select-card">
            <h1>Related Post</h1>
            {/* IMAGE GRID DISPLAY */}
            <div className="grid-container" style={{ gap: "90px 10px" }}>
              {store
                ?.filter((el) => el?.title !== news?.title)
                ?.slice(store.length - 7, store.length)
                ?.map((el) => {
                  return (
                    <div className="item" key={el?._id}>
                      <div className="img-container">
                        <h5 className="nation-badge">
                          {el?.category?.toUpperCase()}
                        </h5>
                        <img
                          src={
                            typeof el?.image !== "string"
                              ? el?.image[0]
                              : el?.image
                          }
                          alt="img.jpg"
                        />
                      </div>
                      <div className="item-body">
                        <Link
                          to={
                            routes.NEWSPAGE_MAIN.path +
                            "/" +
                            convertToSlug(el?.title)
                          }
                          onClick={() => handleClicks(el?._id)}
                        >
                          <h2>{el?.title}</h2>
                        </Link>
                        <div className="time-bottom">
                          <small className="svg-flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              fill="currentColor"
                              class="bi bi-clock"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                            </svg>
                            {formatDate(el?.createdAt)}
                            <small
                              style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                color: "#002",
                              }}
                            >
                              <i class="fa fa-eye" aria-hidden="true"></i>
                              {getNewsClicks(clickedNews, el?._id)}
                            </small>
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="select-card">
      <h1>OPINIONS</h1>
      {/* IMAGE GRID DISPLAY */}
      <div className="grid-container">
        <div className="item">
          <div className="img-container">
            <h5 className="nation-badge">INSIDE NIGERIA</h5>
            <img src={NewImage} alt="img.jpg" />
          </div>
          <div className="item-body">
            <a href="/">
              <h2>
                Nigerian football coach jailed for 15 years in UK over sexual
                assault
              </h2>
            </a>
            <div className="time-bottom">
              <small className="svg-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="bi bi-clock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                September 14, 2022
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="img-container">
            <h5 className="nation-badge">INSIDE NIGERIA</h5>
            <img src={NewImage} alt="img.jpg" />
          </div>
          <div className="item-body">
            <a href="/">
              <h2>
                Nigerian football coach jailed for 15 years in UK over sexual
                assault
              </h2>
            </a>
            <div className="time-bottom">
              <small className="svg-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="bi bi-clock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                September 14, 2022
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="img-container">
            <h5 className="nation-badge">INSIDE NIGERIA</h5>
            <img src={NewImage} alt="img.jpg" />
          </div>
          <div className="item-body">
            <Link to="#">
              <h2>
                Nigerian football coach jailed for 15 years in UK over sexual
                assault
              </h2>
            </Link>
            <div className="time-bottom">
              <small className="svg-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="bi bi-clock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                September 14, 2022
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opinion;
