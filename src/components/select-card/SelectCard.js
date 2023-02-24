import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL, newsAction } from "../../redux/action/newsAction";
import { routes } from "../../routes";
import axios from "axios";
import { convertToSlug } from "../entertainment/Entertainment";
import "./select-card.scss";
import { useDispatch } from "react-redux";
// import { getNewsClicks } from "../card/Card";

function SelectCard({ type }) {
  const [opinion, setOpinionData] = React.useState([]);
  const [opinionSport, setSportData] = React.useState([]);
  const [opinionNews, setOpinionNews] = React.useState([]);
  const [opinionBusiness, setOpinionBusiness] = React.useState([]);
  // const clickedNews = useSelector((el) => el?.clickedNews);
  const convertDate = (date) => {
    return moment(date).format("dddd, MMMM Do YYYY");
  };
  const disaptch = useDispatch();

  const convertDate2 = (date) => {
    return moment(date).format("LL");
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
        console.log(payload);
        disaptch(newsAction.postClickedNews(payload));
        disaptch(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios.get(`${BASE_API_URL}/news/?category=opinions&page=1`).then((res) => {
      setOpinionData(res.data.payload);
      axios.get(`${BASE_API_URL}/news/?category=sport&page=1`).then((res) => {
        setSportData(res.data.payload);
        axios
          .get(`${BASE_API_URL}/news/?category=breaking-news&page=1`)
          .then((res) => {
            setOpinionNews(res.data.payload);
            axios
              .get(`${BASE_API_URL}/news/?category=business&page=1`)
              .then((res) => {
                setOpinionBusiness(res.data.payload);
              });
          });
      });
    });
  }, []);
  if (type === "opinion" && opinion?.length) {
    return (
      <div className="select-card">
        <h1>OPINION</h1>
        <Link
          to={
            routes.NEWSPAGE_MAIN.path + "/" + convertToSlug(opinion[0]?.title)
          }
          onClick={() => handleClicks(opinion[0]?._id)}
          className="image-container"
        >
          <div className="overlay"></div>
          <img
            src={
              typeof opinion[0]?.image === "object"
                ? opinion[0]?.image[0]
                : opinion[0]?.image
            }
            alt="img.jpg"
          />
          <div className="text-container">
            <div>
              <h5 className="nation-badge">OPINION</h5>
            </div>
            <h2>{opinion[0]?.title}</h2>
            <div className="detail-flex">
              <small>
                BY <a href="/">{opinion[0]?.author}</a>
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
                {convertDate(opinion[0]?.createdAt)}
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
              {/* <small
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  color: "#002",
                }}
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
                {getNewsClicks(clickedNews, opinion[0]?._id)}
              </small> */}
            </div>
          </div>
        </Link>
        {/* IMAGE GRID DISPLAY */}
        <div className="grid-container">
          {opinion
            ?.filter((el) => el?.title !== opinion[0]?.title)
            ?.sort((a, b) => b._id - a._id)
            ?.slice(0, 6)
            ?.map((el) => {
              return (
                <div className="item" key={el._id}>
                  <div className="img-container">
                    <h5 className="nation-badge">OPINION</h5>
                    <img
                      src={
                        typeof el?.image === "object" ? el?.image[0] : el?.image
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
                        {convertDate2(el?.createdAt)}
                        {/* <small
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            color: "#002",
                          }}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                          {getNewsClicks(clickedNews, el?._id)}
                        </small> */}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else if (type === "sport" && opinionSport?.length) {
    return (
      <div className="select-card" style={{ marginTop: 150 }}>
        <h1>SPORTS</h1>
        <Link
          to={
            routes.NEWSPAGE_MAIN.path +
            "/" +
            convertToSlug(opinionSport[0]?.title)
          }
          onClick={() => handleClicks(opinionSport[0]?._id)}
          className="image-container"
        >
          <img
            src={
              typeof opinionSport[0]?.image === "object"
                ? opinionSport[0]?.image[0]
                : opinionSport[0]?.image
            }
            alt="img.jpg"
          />
          <div className="text-container">
            <div>
              <h5 className="nation-badge">SPORT</h5>
            </div>
            <h2>{opinionSport[0]?.title}</h2>
            <div className="detail-flex">
              <small>
                BY <a href="/">{opinionSport[0]?.author}</a>
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
                {convertDate(opinionSport[0]?.createdAt)}
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
              {/* <small
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  color: "#002",
                }}
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
                {getNewsClicks(
                  clickedNews,
                  opinionSport[0]?._id
                )}
              </small> */}
            </div>
          </div>
        </Link>
        {/* IMAGE GRID DISPLAY */}
        <div className="grid-container">
          {opinionSport
            ?.filter((el) => el?.title !== opinionSport[0]?.title)
            ?.sort((a, b) => b._id - a._id)
            ?.slice(0, 6)
            ?.map((el) => {
              return (
                <div className="item" key={el._id}>
                  <div className="img-container">
                    <h5 className="nation-badge">SPORT</h5>
                    <img
                      src={
                        typeof el?.image === "object" ? el?.image[0] : el?.image
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
                        {convertDate2(el?.createdAt)}
                        {/* <small
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            color: "#002",
                          }}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                          {getNewsClicks(clickedNews, el?._id)}
                        </small> */}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else if (type === "business" && opinionBusiness?.length) {
    return (
      <div className="select-card">
        <h1>SPORTS</h1>
        <Link
          to={
            routes.NEWSPAGE_MAIN.path +
            "/" +
            convertToSlug(opinionBusiness[0]?.title)
          }
          onClick={() => handleClicks(opinionBusiness[0]?._id)}
          className="image-container"
        >
          <img
            src={
              typeof opinionBusiness[0]?.image !== "string"
                ? opinionBusiness[0]?.image[0]
                : opinionBusiness[0]?.image
            }
            alt="img.jpg"
          />
          <div className="text-container">
            <div>
              <h5 className="nation-badge">SPORT</h5>
            </div>
            <h2>{opinionBusiness[0]?.title}</h2>
            <div className="detail-flex">
              <small>
                BY <a href="/">{opinionBusiness[0]?.author}</a>
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
                {convertDate(opinionBusiness[0]?.createdAt)}
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
              {/* <small
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  color: "#002",
                }}
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
                {getNewsClicks(
                  clickedNews,
                  opinionBusiness[0]?._id
                )}
              </small> */}
            </div>
          </div>
        </Link>
        {/* IMAGE GRID DISPLAY */}
        <div className="grid-container">
          {opinionBusiness
            ?.filter((el) => el?.title !== opinionBusiness[0]?.title)
            ?.sort((a, b) => b._id - a._id)
            ?.slice(0, 6)
            ?.map((el) => {
              return (
                <div className="item" key={el._id}>
                  <div className="img-container">
                    <h5 className="nation-badge">OPINION</h5>
                    <img
                      src={
                        typeof el?.image === "object" ? el?.image[0] : el?.image
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
                        {convertDate2(el?.createdAt)}
                        {/* <small
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            color: "#002",
                          }}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                          {getNewsClicks(clickedNews, el?._id)}
                        </small> */}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else if (type === "news" && opinionNews?.length) {
    return (
      <div className="select-card">
        <h1>BREAKING NEWS</h1>
        <Link
          to={
            routes.NEWSPAGE_MAIN.path +
            "/" +
            convertToSlug(opinionNews[0]?.title)
          }
          onClick={() => handleClicks(opinionNews[0]?._id)}
          className="image-container"
        >
          <img
            src={
              typeof opinionNews[0]?.image === "object"
                ? opinionNews[0]?.image[0]
                : opinionNews[0]?.image
            }
            alt="img.jpg"
          />
          <div className="text-container">
            <div>
              <h5 className="nation-badge">BREAKING NEWS</h5>
            </div>
            <h2>{opinionNews[0]?.title}</h2>
            <div className="detail-flex">
              <small>
                BY <a href="/">{opinionNews[0]?.author}</a>
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
                {convertDate(opinionNews[0]?.createdAt)}
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
              {/* <small
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  color: "#002",
                }}
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
                {getNewsClicks(
                  clickedNews,
                  opinionNews[0]?._id
                )}
              </small> */}
            </div>
          </div>
        </Link>
        {/* IMAGE GRID DISPLAY */}
        <div className="grid-container">
          {opinionNews
            ?.filter((el) => el?.title !== opinionNews[0]?.title)
            ?.sort((a, b) => b._id - a._id)
            ?.slice(0, 6)
            ?.map((el) => {
              return (
                <div className="item" key={el._id}>
                  <Link
                    to={
                      routes.NEWSPAGE_MAIN.path + "/" + convertToSlug(el?.title)
                    }
                    className="img-container"
                    onClick={() => handleClicks(el?._id)}
                  >
                    <h5 className="nation-badge">BREAKING NEWS</h5>
                    <img
                      src={
                        typeof el?.image === "object" ? el?.image[0] : el?.image
                      }
                      alt="img.jpg"
                    />
                  </Link>
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
                        {convertDate2(el?.createdAt)}
                        {/* <small
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            color: "#002",
                          }}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                          {getNewsClicks(clickedNews, el?._id)}
                        </small> */}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default SelectCard;
