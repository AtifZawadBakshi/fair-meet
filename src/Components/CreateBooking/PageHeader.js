import React from "react";
import { Link } from "react-router-dom";
export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="page-header-title">
              <h5 className="m-b-10">Creat Booking</h5>
              <p className="m-b-0">
                Feel free to create a meeting and notify others!
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <ul className="breadcrumb">
              {/* <li className="breadcrumb-item">
                <Link to exact="/">
                  <i className="fa fa-home" />
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link a="/dashboard">Dashboard</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
