import React, { useEffect, useState } from "react";
import "./right-container.scss";
import BodyFlex from "../body-flex/BodyFlex";
import { useDispatch } from "react-redux";
import { BASE_API_URL } from "../../redux/action/newsAction";
import { convertDate, convertToSlug } from "../entertainment/Entertainment";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
// import { getNewsClicks } from "../card/Card";

function RightContainer() {
  const dispacth = useDispatch();
  // const navigate = useNavigate();
  const [politicsNews, setPoliticsNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const clickedNews = useSelector((el) => el?.clickedNews);

  useEffect(() => {
    // dispacth(newsAction.getPoliticsategory("politics"));
    axios.get(`${BASE_API_URL}/news/?category=politics&page=1`).then((res) => {
      setPoliticsNews(res.data.payload);
      setIsLoading(false);
    });
  }, []);
  const handleClick = (store) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        // let data = response.data;
        // let payload = {
        //   id: store?._id,
        //   ip: data.ip,
        // };
        // dispacth(newsAction.postClickedNews(payload));
        // dispacth(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return <Skeleton height={300} width={"100%"} />;
  }
  return (
    <div className="right-container">
      <div className="right-cont1">
        <h1>POLITICS</h1>
        <Link
          to={
            routes.NEWSPAGE_MAIN.path +
            "/" +
            convertToSlug(politicsNews[politicsNews?.length - 1]?.title)
          }
          onClick={() => handleClick(politicsNews[politicsNews?.length - 1])}
          className="image-container"
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              typeof politicsNews[0]?.image === "object"
                ? politicsNews[0]?.image[0]
                : politicsNews[0]?.image
            }
            alt="img.jpg"
          />
          <Link
            to={
              routes.NEWSPAGE_MAIN.path +
              "/" +
              convertToSlug(politicsNews[politicsNews?.length - 1]?.title)
            }
            onClick={() =>
              dispacth(handleClick(politicsNews[politicsNews?.length - 1]))
            }
            className="link-container"
          >
            <div className="text-container">
              <h3>{politicsNews[politicsNews?.length - 1]?.title}</h3>
              <div className="detail-flex">
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
                  {convertDate(
                    politicsNews[politicsNews?.length - 1]?.createdAt
                  )}
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
                    politicsNews[politicsNews?.length - 1]?._id
                  )}
                </small> */}
              </div>
            </div>
          </Link>
        </Link>
        {/* Reusable body-flex */}
        <BodyFlex
          store={politicsNews?.filter(
            (el) => el?.title !== politicsNews[politicsNews?.length - 1]?.title
          )}
          type={"politics"}
        />
        {/* Trending */}
        <div className="trend">
          <div className="trend-box">
            <h5>Trending</h5>
            <h5>Comments</h5>
            <h5>Latest</h5>
          </div>
          <div className="trend-body">
            <BodyFlex />
            <BodyFlex />
            <BodyFlex />
            <BodyFlex />
            <BodyFlex />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightContainer;
