import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { alertActions } from "../../redux/action/alertAction";
import { routes } from "../../routes";
import "./Sidebar.scss";
import Modal from "../Modal";
import simi from "../../assets/img/simi.jpeg";
import aolat from "../../assets/img/aolat.jpeg";
import tunde from "../../assets/img/tunde.jpeg";

const Sidebar = ({ show, onClick }) => {
  const [slug, setSlug] = useState("breaking-news");
  const [isClosed, setisClosed] = useState(false);
  let isLoggedin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [showing, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const dispatch = useDispatch();
  const handleHeaderChange = (slug) => {
    setSlug(slug);
  };
  console.log(slug);
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
  const handleLogout = () => {
    localStorage.clear();
    dispatch(alertActions.success("Logged out"));
  };
  return (
    <>
      <Modal isOpen={showing} close={() => setShow(!show)}>
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
              to={routes.NEWSPAGE.path + "education"}
              onClick={() => handleHeaderChange("education")}
              end
            >
              Education
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "interview"}
              onClick={() => handleHeaderChange("interview")}
              end
            >
              Interview
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.NEWSPAGE.path + "judiciary"}
              onClick={() => handleHeaderChange("judiciary")}
              end
            >
              Judiciary
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
            <NavLink to={"#"} onClick={() => setShow(true)} end>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="#" onClick={() => setShow2(!show2)}>
              About Us
            </NavLink>
          </li>
          {isLoggedin && (
            <li style={{ color: "#f00" }}>
              <Link to={"#"} end onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          {/* <form action="">
            <input type="search" name="" id="" placeholder="Search..." />
          </form> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
