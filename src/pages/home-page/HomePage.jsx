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
import { BASE_API_URL } from "../../redux/action/newsAction";
import axios from "../../helpers/api";
import Skeleton from "react-loading-skeleton";

function HomePage({ children }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // dispacth(newsAction.getLatestNews());
    axios.get(`${BASE_API_URL}/latest-news`).then((res) => {
      setData(res.data.news);
      setIsLoading(false);
    });
    document.title = "Homepage";
  }, [isLoading]);

  return (
    <div className="home-page">
      <Layout hasRightSidebar={true}>
        {isLoading ? <Skeleton height={400} /> : <Card store={data} />}
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
