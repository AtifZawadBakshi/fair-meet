import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <ul class="pcoded-item pcoded-left-item">
        <li class="pcoded-micon">
          <Link to="/home" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-home"></i>
              <b>H</b>
            </span>
            <span class="pcoded-mtext">Home</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
      <ul class="pcoded-item pcoded-left-item">
        <li class="pcoded-micon">
          <Link to="/dashboard" className="sidebar-link">
            <span class="pcoded-micon">
              <i className="ti-layers"></i>
              <b>D</b>
            </span>
            <span class="pcoded-mtext">Dashboard</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>

      <ul class="pcoded-item pcoded-left-item">
        <li class="pcoded-micon">
          <Link to="/create-booking" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="ti-plus"></i>
              <b>CB</b>
            </span>
            <span class="pcoded-mtext">Create Booking</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
      <ul class="pcoded-item pcoded-left-item">
        <li class="pcoded-micon">
          <Link to="/booking-list" className="sidebar-link">
            <span class="pcoded-micon">
              <i class="fas fa-edit"></i>
              <b>UB</b>
            </span>
            <span class="pcoded-mtext">Booking List</span>
            <span class="pcoded-mcaret"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
