import React from "react";
import "./layout.scss";
import RightBar from "../right-bar/RightBar.js";
import RightContainer from "../right-container/RightContainer";
import { FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
const path = window.location.pathname;
function Layout({ children }) {
  const { slug } = useParams();
  const titleParser = (slug) => {
    let outcome = slug.split("-");
    slug = outcome.length > 1 ? outcome[0] + " " + outcome[1] : outcome[0];
    return slug;
  };
  return (
    <div className="container">
      {slug && (
        <div
          style={{
            color: "gray",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>Home </b>
          <FaAngleRight /> {titleParser(slug)}
        </div>
      )}

      <div className="flex-container">
        <div className="flex-left">{children}</div>
        <div className="flex-right">
          <RightBar type={path === "/" || path === "/home" ? "home" : ""}>
            <RightContainer />
          </RightBar>
        </div>
      </div>
    </div>
  );
}

export default Layout;
