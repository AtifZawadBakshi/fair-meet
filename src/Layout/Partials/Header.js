import React from "react";
import { Link } from "react-router-dom";
import * as Helper from "../../../src/Components/Utility/Helper";

function Header(props) {
  const user = props.userDetails;
  console.log(user);
  return (
    <nav className="navbar header-navbar pcoded-header">
      <div className="navbar-wrapper">
        <div className="navbar-logo">
          <a
            className="mobile-menu waves-effect waves-light"
            id="mobile-collapse"
            href="#!"
          >
            <i className="ti-menu" />
          </a>
          <div className="mobile-search waves-effect waves-light">
            <div className="header-search">
              <div className="main-search morphsearch-search">
                <div className="input-group">
                  <span className="input-group-prepend search-close">
                    <i className="ti-close input-group-text" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Keyword"
                  />
                  <span className="input-group-append search-btn">
                    <i className="ti-search input-group-text" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/dashboard">
            <img
              className="img-fluid"
              src="assets/images/Fair-Group-Logo.png"
              alt="Theme-Logo"
              width="150"
              height="250"
            />
          </Link>
          <a className="mobile-options waves-effect waves-light">
            <i className="ti-more" />
          </a>
        </div>
        <div className="navbar-container container-fluid">
          <ul className="nav-left">
            <li>
              <div className="sidebar_toggle">
                <a href="javascript:void(0)">
                  <i className="ti-menu" />
                </a>
              </div>
            </li>
            <li>
              <a
                href="#!"
                onclick="javascript:toggleFullScreen()"
                className="waves-effect waves-light"
              >
                <i className="ti-fullscreen" />
              </a>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="user-profile header-notification">
              <a href="#!" className="waves-effect waves-light">
                <img
                  src="assets/images/user_icon.jpg"
                  className="img-radius"
                  alt="User-Profile-Image"
                />
                <span>{user.name}</span>
                <i className="ti-angle-down" />
              </a>
              <ul className="show-notification profile-notification">
                <li className="waves-effect waves-light">
                  <a href="#!">
                    <i className="ti-settings" /> Settings
                  </a>
                </li>
                <li className="waves-effect waves-light">
                  <a href="user-profile.html">
                    <i className="ti-user" /> Profile
                  </a>
                </li>
                <li className="waves-effect waves-light">
                  <a href="email-inbox.html">
                    <i className="ti-email" /> My Messages
                  </a>
                </li>
                <li className="waves-effect waves-light">
                  <a href="auth-lock-screen.html">
                    <i className="ti-lock" /> Lock Screen
                  </a>
                </li>
                <li className="waves-effect waves-light">
                  <Link to="/logout">
                    <i className="ti-layout-sidebar-left" /> Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
