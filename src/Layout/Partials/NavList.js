import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <ul class="pcoded-item pcoded-left-item">
        <li class="active">
          <Link to="/dashboard" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-home"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Dashboard</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
      <ul class="pcoded-item pcoded-left-item">
        <li class="active">
          <Link to="/corporate-office" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-home"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Corporarate Office</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
      <ul class="pcoded-item pcoded-left-item">
        <li class="active">
          <Link to="/head-office" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-home"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Head Office</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
      <ul class="pcoded-item pcoded-left-item">
        <li class="active">
          <Link to="/autograph" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-home"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Autograph</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>

      <ul class="pcoded-item pcoded-left-item">
        <li class="active">
          <Link to="/login" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-home"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Login</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
