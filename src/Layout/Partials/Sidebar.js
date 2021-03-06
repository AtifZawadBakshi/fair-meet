import React from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";
export default function Sidebar(props) {
  const user = props.userDetails;
  console.log(user);
  return (
    <nav className="pcoded-navbar">
      <div className="sidebar_toggle">
        <Link to="/home" className="icon-close icons"></Link>
      </div>
      <div className="pcoded-inner-navbar main-menu">
        <div style={{ marginTop: "16px" }}>
          <div className="main-menu-header">
            <img
              className="img-80 img-radius"
              src="https://avatars.githubusercontent.com/u/7061205?v=4"
              alt="User-Profile-Image"
            />
            <div className="user-details">
              <span id="more-details">
                {user.name}
                <i className="fa fa-caret-down" />
              </span>
            </div>
          </div>
          <div className="main-menu-content">
            <ul>
              <li className="more-details">
                {/* <a href="user-profile.html">
                  <i className="ti-user" />
                  View Profile
                </a> */}
                {/* <a href="#!">
                  <i className="ti-settings" />
                  Settings
                </a> */}
                <Link to="/logout" style={{ textDecoration: "none" }}>
                  <i className="ti-layout-sidebar-left" /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-15 p-b-0">
          <form className="form-material">
            <div className="form-group form-primary">
              <span className="form-bar" />
            </div>
          </form>
        </div>
        <NavList />
      </div>
    </nav>
  );
}
