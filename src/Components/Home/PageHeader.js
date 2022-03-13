import React from "react";
import { Link } from "react-router-dom";
export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="page-header-title">
              <h5 className="m-b-10">Dashboard</h5>
              <p className="m-b-0">Welcome to FairMeet Dashboard</p>
            </div>
          </div>
          <div className="col-md-4">
            <ul className="breadcrumb"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}
