import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { alertActions } from "../../redux/action/alertAction";
import { routes } from "../../routes";
import "./Sidebar.scss";

const Sidebar = ({ show, onClick }) => {
  const [slug, setSlug] = useState("breaking-news");
  const [isClosed, setisClosed] = useState(false);
  let isLoggedin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const dispatch = useDispatch();
  const handleHeaderChange = (slug) => {
    setSlug(slug);
  };
  console.log(slug);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(alertActions.success("Logged out"));
  };
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
              onClick={() => {
                handleHeaderChange("breaking-news");
                onClick();
              }}
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "entertainment"}
              onClick={() => {
                handleHeaderChange("entertainment");
                onClick();
              }}
              end
            >
              Entertainment
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "business"}
              onClick={() => {
                handleHeaderChange("business");
                onClick();
              }}
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
              onClick={() => {
                handleHeaderChange("opinions");
                onClick();
              }}
              end
            >
              Opinions
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "sport"}
              onClick={() => {
                handleHeaderChange("sport");
                onClick();
              }}
              end
            >
              Sport
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "crime-report"}
              onClick={() => {
                handleHeaderChange("crime-report");
                onClick();
              }}
              end
            >
              Crime Report
            </NavLink>
          </li>
          <li>
            <NavLink to="#">Contact Us</NavLink>
          </li>
          {isLoggedin && (
            <li style={{ color: "#f00" }}>
              <Link to={"#"} end onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          <form action="">
            <input type="search" name="" id="" placeholder="Search..." />
          </form>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
