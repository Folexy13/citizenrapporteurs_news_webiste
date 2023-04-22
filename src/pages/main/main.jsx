import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Layout, Opinion } from "../../components";
import Footer from "../../components/footer/Footer";
import { alertActions } from "../../redux/action/alertAction";
import { BASE_API_URL, newsAction } from "../../redux/action/newsAction";
import "./main.scss";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Main = () => {
  const [comment, setComment] = useState("");
  let allComments = useSelector((el) => el?.comments);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState("");
  const [news, setNews] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispacth = useDispatch();
  const location = useLocation();
  let slug = location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const id = localStorage.getItem("newsID");

  const handleSubmitComment = (e) => {
    setLoading(true);
    e.preventDefault();
    localStorage.setItem("email", email);
    let payload = {
      comment,
      email,
      website,
      author,
      newsID: id,
    };
    if (!comment || !email) {
      dispacth(alertActions.error("All Fields marked(*) are important"));
      setLoading(false);
      return;
    }
    dispacth(newsAction.postComment(payload));
  };
  useEffect(() => {
    axios.get(`${BASE_API_URL}/news/?category=${slug}&page=1`).then((res) => {
      setData(res.data.payload);
      axios
        .post(`${BASE_API_URL}/single-news`, {
          ip: localStorage.getItem("uuid"),
          slug,
        })
        .then((res) => {
          setNews(res.data.news);
          setIsLoading(false);
        });
    });
  }, [slug]);

  // useEffect(() => {
  //   axios
  //     .get("https://ipapi.co/json/")
  //     .then((response) => {
  //       let data = response.data;
  //       let payload = {
  //         ip: data.ip,
  //         id,
  //       };
  //       // axios.post(`${BASE_API_URL}/single-news` {})
  //       dispacth(newsAction.postClickedNews(payload));
  //       dispacth(newsAction.getSingleNews({ payload }));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // eslint-disable-next-line
  // }, [dispacth]);
  // console.log(data);
  return (
    <>
      {!isLoading ? (
        <div className="news_main">
          <Layout hasRightSidebar={false} style={{ flexDirection: "column" }}>
            <Card store={news} type="main" />
            <Opinion type="main" store={data} />
            <div className="comment">
              <h2>
                Comments <span className="badge">{allComments?.length}</span>
              </h2>
              {allComments?.map((el) => {
                return (
                  <div className="comment__body" key={el?._id}>
                    <div className="flex">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <div className="name">
                        <b>{el?.author}</b>
                      </div>
                      <i className="fa fa-clock-o" aria-hidden="true">
                        <span>
                          {moment(new Date(el.createdAt), "YYYYMMDD").fromNow()}
                        </span>
                      </i>
                    </div>

                    <p>{el?.comment}</p>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSubmitComment} className="comment-section">
              <h1>Leave a Reply</h1>
              <h3>
                Your email address will not be published. Required fields are
                marked
                <span style={{ color: "#F00", fontWeight: 800 }}>*</span>
              </h3>
              <div className="form-control">
                <label htmlFor="">
                  Comment{" "}
                  <span style={{ color: "#F00", fontWeight: 800 }}>*</span>
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="flex">
                <div className="form-control">
                  <label htmlFor="">
                    Email{" "}
                    <span style={{ color: "#F00", fontWeight: 800 }}>*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="">Name </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="">Website </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-control">
                <button disabled={loading} type="submit">
                  {loading ? "Submitting..." : "POST COMMENT"}
                </button>
              </div>
            </form>
          </Layout>
          <div className="footer-section">
            <Footer />
          </div>
        </div>
      ) : (
        <Skeleton height={500} />
      )}
    </>
  );
};

export default Main;
