import React, { useEffect } from "react";
import moment from "moment";
import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../routes";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux/action/alertAction";

const todayDate = (date) => {
  date = moment(date).format("LLLL");
  return date;
};
function Navbar({ onClick, state }) {
  let isLoggedin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const preState = JSON.parse(localStorage.getItem("state"));

  const [slug, setSlug] = useState("breaking-news");
  const alert = useSelector((el) => el?.alert);
  const dispatch = useDispatch();
  console.log(slug);
  const handleHeaderChange = (slug) => {
    setSlug(slug);
  };
  useEffect(() => {
    if (alert?.type === "alert-success") {
      toast.success(alert.message, {
        toastId: "successid",
      });

      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1000);
    } else if (alert?.type === "alert-danger") {
      toast.error(alert.message, {
        toastId: "errormn",
      });
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1000);
    }
  }, [dispatch, alert]);
  useEffect(() => {
    setInterval(() => {}, 1000);
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(alertActions.success("Logged out"));
  };
  return (
    <>
      <div className="navBar">
        <ToastContainer />
        <div className="navTopCon">
          <div className="navTop">
            <div className="navTopContainer">
              {/* Current Time Container */}
              <div className="time">
                <small>{todayDate(new Date())}</small>
              </div>
              <div className="socialLink">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-twitter"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="secondNavContainer">
          {/* Middle Navbar */}
          <div className="navMiddle">
            <Link to="/" className="logo">
              Citizen Rapporteur
            </Link>
            {/* Filter Form */}
            <form className="search">
              <div className="row">
                <input type="text" name="q" id="q" placeholder="Search..." />
                <button className="danger" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </form>
            {/* Menu Bar */}
            <div className="menu" onClick={onClick}>
              {(!state || preState) && (
                <i class="fa fa-bars" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
        {/* Navbar Last */}
        <div className="navLast">
          <NavLink to="/" end>
            <h5>HOME</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "breaking-news"}
            onClick={() => handleHeaderChange("breaking-news")}
          >
            <h5>NEWS</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "politics"}
            onClick={() => handleHeaderChange("politics")}
            end
          >
            <h5>POLITICS</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "business"}
            onClick={() => handleHeaderChange("business")}
            end
          >
            <h5>BUSINESS</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "opinions"}
            onClick={() => handleHeaderChange("opinions")}
            end
          >
            <h5>OPINION</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "sport"}
            onClick={() => handleHeaderChange("sport")}
            end
          >
            <h5>SPORT</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "crime-report"}
            onClick={() => handleHeaderChange("crime-report")}
            end
          >
            <h5>CRIME REPORT</h5>
          </NavLink>
          <NavLink
            to={routes.NEWSPAGE.path + "entertainment"}
            onClick={() => handleHeaderChange("entertainment")}
            end
          >
            <h5>ENTERTAINMENT</h5>
          </NavLink>
          <Link to={"#"} end>
            <h5>CONTACT US</h5>
          </Link>
          {isLoggedin && (
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <h5 style={{ marginTop: 10 }}>LOGOUT</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
