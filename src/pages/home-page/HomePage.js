import React, { useEffect } from "react";
import "./home-page.scss";
import {
  Card,
  Entertainment,
  Layout,
  Opinion,
  SelectCard,
  SingleRow,
  Witness,
} from "../../components";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newsAction } from "../../redux/action/newsAction";

function HomePage({ children }) {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const latestNews = useSelector((el) => el?.latestNews);

  useEffect(() => {
    dispacth(newsAction.getLatestNews());
  }, [dispacth]);

  return (
    <div className="home-page">
      <Layout>
        <Card store={latestNews} />
        <SelectCard />
        <Opinion />
      </Layout>
      <div className="last-container">
        <div className="middle-container">
          <SingleRow />
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
