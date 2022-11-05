import React, { useEffect } from "react";
import "./home-page.scss";
import {
  Card,
  Entertainment,
  Layout,
  SelectCard,
  Witness,
} from "../../components";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { newsAction } from "../../redux/action/newsAction";

function HomePage({ children }) {
  const dispacth = useDispatch();
  const latestNews = useSelector((el) => el?.latestNews);

  useEffect(() => {
    dispacth(newsAction.getLatestNews());
    document.title = "Homepage";
  }, [dispacth]);

  return (
    <div className="home-page">
      <Layout hasRightSidebar={true}>
        <Card store={latestNews} />
        <SelectCard type="opinion" />
        <SelectCard type="news" />
        <SelectCard type="business" />
        <SelectCard type="sport" />
      </Layout>
      <div className="last-container">
        <div className="middle-container">
          <Entertainment />
          <Witness />
        </div>
      </div>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
