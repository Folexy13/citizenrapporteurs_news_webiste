import React from "react";
import "./layout.scss";
import RightBar from "../right-bar/RightBar.js";
import RightContainer from "../right-container/RightContainer";
import { FaAngleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { routes } from "../../routes";
const path = window.location.pathname;
function Layout({ children, hasRightSidebar }) {
  const { slug } = useParams();
  const titleParser = (slug) => {
    let outcome = slug.split("-");
    slug = outcome.length > 1 ? outcome.join(" ")?.toUpperCase() : outcome[0];
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
          <Link to={routes.HOMEPAGE.path}>
            <b>HOME </b>
          </Link>
          <FaAngleRight /> {titleParser(slug)}
        </div>
      )}

      <div className="flex-container">
        <div
          className="flex-left"
          style={{
            width: hasRightSidebar ? "70%" : "90%",
            textAlign: hasRightSidebar ? "inherit" : "justify",
          }}
        >
          {children}
        </div>
        {hasRightSidebar && (
          <div className="flex-right">
            <RightBar>
              <RightContainer />
            </RightBar>
          </div>
        )}
      </div>
    </div>
  );
}
Layout.defaultProps = {
  hasRightSidebar: true,
};
export default Layout;
