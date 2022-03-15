import React from "react";
export default function HeaderPage() {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="page-header-title">
              <h5 className="m-b-10">HEAD OFFICE</h5>
              <p className="m-b-0">
                76/B, Khawaja Palace, Road-11, Banani, Dhaka-1213, Bangladesh.
              </p>
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
