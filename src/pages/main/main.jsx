import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Layout, Opinion } from "../../components";
import Footer from "../../components/footer/Footer";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./main.scss";
import { useParams } from "react-router-dom";
const Main = ({ type }) => {
  const store = useSelector((el) => el?.mainNews);
  let news = useSelector((el)=>el?.categoryNews);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

 
  const dispacth = useDispatch();
  const handleSubmitComment = (e) => {
    e.preventDefault();
    let payload = {
      comment,
      email,
      website,
    };
    if (!comment || !comment) {
      dispacth(alertActions.error("All Fields marked(*) are important"));
      return;
    }
    dispacth(newsAction.postComment(payload));
  };
  useEffect(() => {
    dispacth(newsAction.getNewsCategory(store.slug))
  },[dispacth, store, id])
  // useEffect(() => {
  //   if (store?.slug === "crime-report") {
  //     dispacth(newsAction.getCrimeCategory("crime-report"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   } else if (store?.slug === "news") {
  //     dispacth(newsAction.getNewsCategory("breaking-news"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   } else if (store?.slug === "politics") {
  //     dispacth(newsAction.getPoliticsategory("politics"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   } else if (store?.slug === "business") {
  //     dispacth(newsAction.getBusinessCategory("business"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   } else if (store?.slug === "sport") {
  //     dispacth(newsAction.getSportCategory("sport"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   } else if (store?.slug === "entertainment") {
  //     dispacth(newsAction.getCrimeCategory("entertainment"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   } else if (store?.slug === "opinion") {
  //     dispacth(newsAction.getOpinionCategory("opinion"));
  //     // dispacth(newsAction.getSingleNews(id));
  //   }
  // }, [dispacth, store, id]);
  useEffect(() => {
    if (id) {
      dispacth(newsAction.getSingleNews(id));
    } else {
      return;
    }
  }, [dispacth, id]);
  return (
    <div className="news_main">
      <Layout hasRightSidebar={false}>
        <Card store={store} type="main" />
        <Opinion type="main" store={news} />
        <form onSubmit={handleSubmitComment} className="comment-section">
          <h1>Leave a Reply</h1>
          <h3>
            Your email address will not be published. Required fields are marked
            <span style={{ color: "#F00", fontWeight: 800 }}>*</span>
          </h3>
          <div className="form-control">
            <label htmlFor="">
              Comment <span style={{ color: "#F00", fontWeight: 800 }}>*</span>
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
                Email <span style={{ color: "#F00", fontWeight: 800 }}>*</span>
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
            <button type="submit">POST COMMENT</button>
          </div>
        </form>
      </Layout>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
