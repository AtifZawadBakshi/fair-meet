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
          <Link to="/create-booking" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-plus"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Meeting Booking</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
