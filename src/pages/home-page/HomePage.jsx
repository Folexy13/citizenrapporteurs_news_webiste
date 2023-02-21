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
import { useDispatch } from "react-redux";
import { BASE_API_URL } from "../../redux/action/newsAction";
import axios from "../../helpers/api";

function HomePage({ children }) {
  const dispacth = useDispatch();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    // dispacth(newsAction.getLatestNews());
    axios.get(`${BASE_API_URL}/latest-news`).then((res) => {
      setData(res.data.news);
    });
    document.title = "Homepage";
  }, [dispacth]);

  return (
    <div className="home-page">
      <Layout hasRightSidebar={true}>
        <Card store={data} />
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
