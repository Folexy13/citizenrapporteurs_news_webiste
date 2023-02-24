import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./footer.scss";
import { newsAction } from "../../redux/action/newsAction";
import { routes } from "../../routes";
import { convertToSlug } from "../entertainment/Entertainment";
import Modal from "../Modal";
import simi from "../../assets/img/simi.jpeg";
import aolat from "../../assets/img/aolat.jpeg";
import tunde from "../../assets/img/tunde.jpeg";

function Footer() {
  const latestNews = useSelector((el) => el?.latestNews);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const users = [
    {
      name: "Aolat Oluwatomisin",
      phone: "+447404814926",
      img: aolat,
      title: "Publisher",
    },
    {
      name: "Tunde Akingbondere",
      phone: "09066991652",
      img: tunde,
      title: "Managing Editor",
    },
    {
      name: "Akinseye Similoluwa",
      phone: "08119526322",
      img: simi,
      title: "Staff Writer",
    },
  ];
  const handleClicks = (id) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          id,
          ip: data.ip,
        };
        // dispatch(newsAction.postClickedNews(payload));
        // dispatch(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal isOpen={show} close={() => setShow(!show)}>
        <h2 className="title">Contact Us</h2>
        <div className="imgFlex">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <img src={user.img} alt={user.name} />
              <h3>{user.name}</h3>
              <p className="description">{user.phone}</p>
              <p className="price">{user.title}</p>
            </div>
          ))}
        </div>
      </Modal>
      <Modal type="about" isOpen={show2} close={() => setShow2(!show2)}>
        <h2 className="title">About Us</h2>
        <div className="imgFlex">
          Citizen Rapporteurs is a multi-faceted media and news outfit, created
          with the intention of spotlighting topical, under-reported and
          pressing issues having to do with the citizens of Nigeria. It is the
          mirror of the citizenry to the domestic and international happenings,
          verified cases of human right abuses, entertainment, politics,
          business, education, sports, security and classified opinions on
          topical issues or happenings in the Nigerian State. It is defined by
          objectivity and the will to tell the story the citizen's way.
        </div>
      </Modal>
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
              <Link to="/" onClick={() => setShow2(!show2)}>
                About Us /
              </Link>
              <Link to="/">Advertise /</Link>
              <Link to="/" onClick={() => setShow(!show)}>
                Contact Us /
              </Link>
              <a
                href="https://termify.io/dashboard/"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy /
              </a>
              <Link to="/">Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
