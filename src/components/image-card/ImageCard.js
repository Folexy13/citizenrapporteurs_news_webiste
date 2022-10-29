import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { newsAction } from "../../redux/action/newsAction";
import { routes } from "../../routes";
import axios from "axios";
import { convertDate, convertToSlug } from "../entertainment/Entertainment";
import "./image-card.scss";
import { getNewsClicks } from "../card/Card";

function ImageCard({ store }) {
  const dispacth = useDispatch();
  const clickedNews = useSelector((el) => el?.clickedNews);
  const handleClicks = (id) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          id,
          ip: data.ip,
        };
        console.log(payload);
        dispacth(newsAction.postClickedNews(payload));
        dispacth(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="image-card">
      <Link
        to={
          routes.NEWSPAGE_MAIN.path +
          "/" +
          store?._id +
          "/" +
          convertToSlug(store.title)
        }
        onClick={() => handleClicks(store?._id)}
        className="image-container"
      >
        <img src={store?.image} alt="img.jpg" />
        <div className="text-container">
          <div>
            <h5 className="nation-badge">{store?.category?.toUpperCase()}</h5>
          </div>
          <h2>{store?.title}</h2>
          <div className="detail-flex">
            <small>
              BY <Link to="#">{store?.author}</Link>
            </small>
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
              {convertDate(store?.createdAt)}
            </small>
            <small className="svg-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                class="bi bi-chat"
                viewBox="0 0 16 16"
              >
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
              </svg>
              0
            </small>
            <small
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
              {getNewsClicks(clickedNews, store?._id)}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ImageCard;
