import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ show, onClick }) => {
  return (
    <>
      <div
        className="sidebar-container"
        style={{ display: show ? "block" : "none" }}
      />
      <div
        className="cr-sidebar"
        style={{ transform: show ? "translateX(0)" : "translateX(-100vw)" }}
      >
        <i class="fa fa-times" aria-hidden="true" onClick={onClick}></i>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">News</NavLink>
          </li>
          <li>
            <NavLink to="/">Entertainment</NavLink>
          </li>
          <li>
            <NavLink to="/">Business</NavLink>
          </li>
          <li>
            <NavLink to="/">Politics</NavLink>
          </li>
          <li>
            <NavLink to="/">Opinions</NavLink>
          </li>
          <li>
            <NavLink to="/">Sport</NavLink>
          </li>
          <li>
            <NavLink to="/">Crime Report</NavLink>
          </li>
          <li>
            <NavLink to="/">Contact Us</NavLink>
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
