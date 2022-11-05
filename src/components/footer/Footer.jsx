import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./footer.scss";
import { newsAction } from "../../redux/action/newsAction";
import { routes } from "../../routes";
import { convertToSlug } from "../entertainment/Entertainment";

function Footer() {
  const latestNews = useSelector((el) => el?.latestNews);
  const dispatch = useDispatch();
  const handleClicks = (id) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          id,
          ip: data.ip,
        };
        dispatch(newsAction.postClickedNews(payload));
        dispatch(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-item">
          <Link to="/" className="logo">
            Citizen Rapporteur
          </Link>
        </div>
        <div className="footer-item">
          <h6>Categories</h6>
          <div className="item-flex">
            <div className="flex1">
              <Link to={"/category/breaking-news"}>
                <h6>News</h6>
              </Link>
              <Link to="/category/entertainment">
                <h6>Entertainment</h6>
              </Link>
              <Link to="/category/politics">
                <h6>Politics</h6>
              </Link>
              <Link to="/category/crime-report">
                <h6>Crime Report</h6>
              </Link>
            </div>
            <div className="flex1">
              <Link to="/category/business">
                <h6>Business</h6>
              </Link>
              <Link to="/category/opinion">
                <h6>Opinion</h6>
              </Link>
              <Link to="/category/sport">
                <h6>Sport</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-item">
          <h6>Headlines</h6>
          <div className="item-text">
            <Link
              to={
                routes.NEWSPAGE_MAIN.path +
                "/" +
                convertToSlug(latestNews[8]?.title)
              }
              onClick={() => handleClicks(latestNews[8]?._id)}
              className="img"
            >
              <h6>{latestNews[8]?.title}</h6>
            </Link>
            <Link
              to={
                routes.NEWSPAGE_MAIN.path +
                "/" +
                convertToSlug(latestNews[9]?.title)
              }
              onClick={() => handleClicks(latestNews[9]?._id)}
              className="img"
            >
              <h6>{latestNews[9]?.title}</h6>
            </Link>
          </div>
        </div>
      </div>
      <div className="copy-cont">
        <div className="copywrite">
          <div className="copy-flex">
            <p>
              Copyright © 2022 Citizen Rapporteurs Newspaper | All Rights
              Reserved.{" "}
            </p>
          </div>
          <div className="copy-flex copy-link">
            <Link to="/">About Us /</Link>
            <Link to="/">Advertise /</Link>
            <Link to="/">Contact Us /</Link>
            <Link to="/">Privacy Policy /</Link>
            <Link to="/">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
