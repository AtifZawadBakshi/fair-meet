import React from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";

export default function Sidebar() {
  return (
    // <div style={{ width: "20%", height: "100%" }}>
    <div className="pcoded-main-container">
      <div className="pcoded-wrapper">
        <nav className="pcoded-navbar">
          <div className="sidebar_toggle">
            <a href="#">
              <i className="icon-close icons" />
            </a>
          </div>
          <div className="pcoded-inner-navbar main-menu">
            <div className>
              <div className="main-menu-header">
                <img
                  className="img-80 img-radius"
                  src="assets/images/avatar-4.jpg"
                  alt="User-Profile-Image"
                />
                <div className="user-details">
                  <span id="more-details">
                    Atif Zawad
                    <i className="fa fa-caret-down" />
                  </span>
                </div>
              </div>
              <div className="main-menu-content">
                <ul>
                  <li className="more-details">
                    <a href="user-profile.html">
                      <i className="ti-user" />
                      View Profile
                    </a>
                    <a href="#!">
                      <i className="ti-settings" />
                      Settings
                    </a>
                    <a href="auth-normal-sign-in.html">
                      <i className="ti-layout-sidebar-left" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-15 p-b-0">
              <form className="form-material">
                <div className="form-group form-primary">
                  <input
                    type="text"
                    name="footer-email"
                    className="form-control"
                  />
                  <span className="form-bar" />
                  <label className="float-label">
                    <i className="fa fa-search m-r-10" />
                    Search Friend
                  </label>
                </div>
              </form>
            </div>
            <div className="pcoded-navigation-label">Navigation</div>
            <NavList />
            <nav id="sidebar" className="sidebar js-sidebar">
              <div
                className="sidebar-content js-simplebar"
                data-simplebar="init"
              >
                <div className="simplebar-wrapper" style={{ margin: 0 }}>
                  <div className="simplebar-height-auto-observer-wrapper">
                    <div className="simplebar-height-auto-observer" />
                  </div>
                  <div className="simplebar-mask">
                    <div
                      className="simplebar-offset"
                      style={{ right: 0, bottom: 0 }}
                    >
                      <div
                        className="simplebar-content-wrapper"
                        tabIndex={0}
                        role="region"
                        aria-label="scrollable content"
                        style={{ height: "100%", overflow: "hidden scroll" }}
                      >
                        <div
                          className="simplebar-content"
                          style={{ padding: 0 }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="simplebar-placeholder"
                    style={{ width: "auto", height: 948 }}
                  />
                </div>
                <div
                  className="simplebar-track simplebar-horizontal"
                  style={{ visibility: "hidden" }}
                >
                  <div
                    className="simplebar-scrollbar"
                    style={{ width: 0, display: "none" }}
                  />
                </div>
                <div
                  className="simplebar-track simplebar-vertical"
                  style={{ visibility: "visible" }}
                >
                  <div
                    className="simplebar-scrollbar"
                    style={{
                      height: 129,
                      transform: "translate3d(0px, 0px, 0px)",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </nav>
          </div>
        </nav>
      </div>
    </div>
    // </div>
  );
}
