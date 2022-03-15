import React from "react";
import { Link } from "react-router-dom";
export default function HeaderPage() {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="page-header-title">
              <h5 className="m-b-10">STRATEGIC OFFICE</h5>
              <p className="m-b-0">
                Autograph Building, 67 & 68 Kemal Ataturk Ave, Banani,
                Dhaka-1213, Bangladesh.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <ul className="breadcrumb">
              <Link
                to="/home"
                className="btn btn-primary btn-sm me-2"
                style={{ padding: "8px 8px", margin: "5px" }}
              >
                Return
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
