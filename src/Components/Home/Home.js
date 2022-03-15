import React from "react";
import HomeHeader from "./HomeHeader";
import "./home.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <HomeHeader />
      <div>
        <div className="wrapper">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card-home mb-3 mb-lg-0">
                <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                <div class="info">
                  <h1>Head Office</h1>
                  <p>Khawaja Palace, Banani, Dhaka-1213</p>
                  <button>
                    <Link to="/head-office">Details</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div class="card-home  mb-3 mb-lg-0">
                <img src="https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80" />
                <div class="info">
                  <h1>Corporate Office</h1>
                  <p>Lintoo Center, Banani, Dhaka-1213</p>
                  <button>
                    <Link to="/corporate-office">Details</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div class="card-home  mb-3 mb-lg-0">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" />
                <div class="info">
                  <h1>Strategic Office</h1>
                  <p>Autograph Building, Banani, Dhaka-1213</p>

                  <button>
                    <Link to="/strategic-office">Details</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
