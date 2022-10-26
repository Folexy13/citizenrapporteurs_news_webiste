import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { newsAction } from "../../redux/action/newsAction";
import { routes } from "../../routes";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import "./card.scss";
const capitalizeLetter = (name) => {
  return name?.toUpperCase();
};
export const getNewsClicks = (arr, id) => {
  let click = 0;
  if (arr?.length) {
    let news = arr.find((el) => el.newsID === id);
    click = news?.clicks ? news?.clicks : 0;
    return click;
  }
  return click;
};
const convertDate = (date) => {
  return moment(date).format("dddd, MMMM Do YYYY");
};
export const truncateText = (str, size) => {
  return str?.length > size ? str.substring(0, size - 3) + "..." : str;
};

const convertToSlug = (input) => {
  if (input) {
    let slug = input
      .toLocaleLowerCase()
      .replaceAll(",", "-")
      .split(" ")
      .filter((el) => el.length > 1)
      .join("-");
    return slug;
  }
};

function Card({ store, type }) {
  const dispacth = useDispatch();
  const clickedNews = useSelector((el) => el?.clickedNews);
  const handleNewsMain = (id) => {
    let news = store?.find((el) => el?._id === id);
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          id,
          ip: data.ip,
        };
        dispacth(newsAction.postClickedNews(payload));
        dispacth(newsAction.getSingleNews(news?._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (type === "main") {
    return (
      <>
        <div className="detail-flex">
          <small>
            BY <Link to="#">{store?.author} </Link>
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
            style={{
              display: "flex",
              color: "#002",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <i class="fa fa-eye" aria-hidden="true"></i>
            {getNewsClicks(clickedNews, store?._id)}
          </small>
        </div>
        <div className="card">
          <div className="img-container">
            <Link to="#">
              <img src={store?.image} alt="img.jpg" />
            </Link>
          </div>
          <div className="card-body">
            <div className="item1">
              <Link href="#" className="item-title">
                <h1>{store?.title}</h1>
              </Link>
              <div className="btn-flex">
                <WhatsappShareButton url={window.location.href} className="wh">
                  <i className="fa fa-whatsapp"></i>{" "}
                  <span>Share On Whatsapp</span>{" "}
                
                </WhatsappShareButton>
                <FacebookShareButton url={window.location.href} className="fb">
                  <i className="fa fa-facebook-official"></i>{" "}
                  <span>Share on Facebook</span>
                </FacebookShareButton>
                <LinkedinShareButton url={window.location.href} className="ins">
                  <i className="fa fa-linkedin"></i>{" "}
                  <span>Share On LinkedIn</span>
                </LinkedinShareButton>
                <TwitterShareButton url={window.location.href} className="tw">
                  <i className="fa fa-twitter"></i>{" "}
                  <span>Share On Twitter</span>
                </TwitterShareButton>
              </div>
              <p style={{ fontSize: 16, marginTop: 80 }}>
                {store?.description}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="card">
      <div
        className="img-container"
        onClick={() => handleNewsMain(store[0]?._id)}
      >
        <Link
          to={
            routes.NEWSPAGE_MAIN.path +
            "/" +
            store[0]?._id +
            "/" +
            convertToSlug(store[0]?.title)
          }
          onClick={() => handleNewsMain(store[0]?._id)}
        >
          <img src={store[0]?.image} alt="img.jpg" />
        </Link>
        <h5>{capitalizeLetter(store[0]?.category)}</h5>
      </div>
      <div className="card-body">
        <div className="item1">
          <Link
            to={
              routes.NEWSPAGE_MAIN.path +
              "/" +
              store[0]?._id +
              "/" +
              convertToSlug(store[0]?.title)
            }
            className="item-title"
          >
            <h1>{store[0]?.title}</h1>
          </Link>
          <div className="detail-flex">
            <small>
              BY <a href="/">{store[0]?.author}</a>
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
              {convertDate(store[0]?.createdAt)}
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
              style={{
                display: "flex",
                color: "#002",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
              {getNewsClicks(clickedNews, store[0]?._id)}
            </small>
          </div>
          <p>{truncateText(store[0]?.description, 250)}</p>
          <Link
            to={
              routes.NEWSPAGE_MAIN.path +
              "/" +
              store[0]?._id +
              "/" +
              convertToSlug(store[0]?.title)
            }
            className="read"
          >
            READ MORE
          </Link>
        </div>
        <div className="item-bottom">
          {store?.slice(1, 5)?.map((el) => {
            return (
              <h5 className="item-flex" key={el.id}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="red"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
                <Link
                  to={
                    routes.NEWSPAGE_MAIN.path +
                    "/" +
                    el._id +
                    "/" +
                    convertToSlug(el?.title)
                  }
                  onClick={() => handleNewsMain(el?._id)}
                >
                  {el.title}
                </Link>
              </h5>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
