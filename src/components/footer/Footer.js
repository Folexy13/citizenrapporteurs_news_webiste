import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-item">
          <Link to="/" className="logo">
            <img src={logo} alt="img.jpg" className="logo" />
            <p>Citizen Rapporteur</p>
          </Link>
        </div>
        <div className="footer-item">
          <h6>Categories</h6>
          <div className="item-flex">
            <div className="flex1">
              <Link to="/">
                <h6>Business</h6>
              </Link>
              <Link to="/">
                <h6>Entertainment</h6>
              </Link>
              <Link to="/">
                <h6>Health</h6>
              </Link>
            </div>
            <div className="flex1">
              <Link to="/">
                <h6>Business</h6>
              </Link>
              <Link to="/">
                <h6>Entertainment</h6>
              </Link>
              <Link to="/">
                <h6>Health</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-item">
          <h6>Categories</h6>
          <div className="item-text">
            <Link to="/">
              <h6>
                Insecurity: Northern governors, traditional rulers demand state
                police
              </h6>
            </Link>
            <Link to="/">
              <h6>
                Insecurity: Northern governors, traditional rulers demand state
                police
              </h6>
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
