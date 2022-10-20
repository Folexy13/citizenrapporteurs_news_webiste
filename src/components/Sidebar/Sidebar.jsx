import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import "./Sidebar.scss";

const Sidebar = ({ show, onClick }) => {
  const [slug, setSlug] = useState("breaking-news");
  const [isClosed, setisClosed] = useState(false);
  const handleHeaderChange = (slug) => {
    setSlug(slug);
  };
  console.log(slug);
  return (
    <>
      <div
        className="sidebar-container"
        style={{ display: show && !isClosed ? "block" : "none" }}
        onClick={() => {
          setisClosed(isClosed);
          onClick();
        }}
      />
      <div
        className="cr-sidebar"
        style={{
          transform: show && !isClosed ? "translateX(0)" : "translateX(-100vw)",
        }}
      >
        <i
          class="fa fa-times"
          aria-hidden="true"
          onClick={() => {
            setisClosed(isClosed);
            onClick();
          }}
        ></i>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "breaking-news"}
              onClick={() => handleHeaderChange("breaking-news")}
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "entertainment"}
              onClick={() => handleHeaderChange("entertainment")}
              end
            >
              Entertainment
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "business"}
              onClick={() => handleHeaderChange("business")}
              end
            >
              Business
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "politics"}
              onClick={() => handleHeaderChange("politics")}
              end
            >
              Politics
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "opinions"}
              onClick={() => handleHeaderChange("opinions")}
              end
            >
              Opinions
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "sport"}
              onClick={() => handleHeaderChange("sport")}
              end
            >
              Sport
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "crime-report"}
              onClick={() => handleHeaderChange("crime-report")}
              end
            >
              Crime Report
            </NavLink>
          </li>
          <li>
            <NavLink to="#">Contact Us</NavLink>
          </li>
          <form action="">
            <input type="search" name="" id="" placeholder="Search..." />
          </form>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
