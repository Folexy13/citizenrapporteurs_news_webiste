import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Layout, Opinion } from "../../components";
import Footer from "../../components/footer/Footer";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./main.scss";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";

const Main = () => {
  let news = useSelector((el) => el?.categoryNews);
  const { slug } = useParams();
  const [comment, setComment] = useState("");
  let allComments = useSelector((el) => el?.comments);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState("");

  const dispacth = useDispatch();
  let store = useSelector((el) => el?.mainNews);

  const handleSubmitComment = (e) => {
    setLoading(true);
    e.preventDefault();
    localStorage.setItem("email", email);
    let payload = {
      comment,
      email,
      website,
      author,
      newsID: store?._id,
    };
    if (!comment || !email) {
      dispacth(alertActions.error("All Fields marked(*) are important"));
      setLoading(false);
      return;
    }
    dispacth(newsAction.postComment(payload));
  };

  useEffect(() => {
    dispacth(newsAction.getNewsCategory(store.slug));
    dispacth(newsAction.getNewsComment(store?._id));
  }, [dispacth, store]);
  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          ip: data.ip,
        };
        dispacth(newsAction.postClickedNews(payload));
        dispacth(newsAction.getSingleNews({ slug }));
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line
  }, [dispacth]);

  return (
    <>
      <div className="news_main">
        <Layout hasRightSidebar={false} style={{ flexDirection: "column" }}>
          <Card store={store} type="main" />
          <Opinion type="main" store={news} />
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
    </>
  );
};

export default Main;
