import axios from "axios";
import React, { useEffect, useState } from "react";
import "./dash.css";
import { URL, BOOKING_LIST, API } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";

export default function Dashboard() {
  const [offices, setOffices] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || null;
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios
      .get(URL + BOOKING_LIST)
      .then((response) => {
        setOffices(response.data.data.offices);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", "BOOKING_LIST API not working!");
      });
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <Loader />
      </section>
    );
  }

  const { id, title, created_at, updated_at, rooms } = offices[value];

  return (
    <div className="card">
      <div className="card-header">
        <h5>Scheduled Meetings</h5>
      </div>
      <div className="card-block">
        <section className="section">
          <div className="jobs-center">
            <div className="btn-container">
              {offices.map((item, index) => {
                return (
                  <button
                    style={{ padding: "5px", margin: "2px" }}
                    key={item.id}
                    onClick={() => setValue(index)}
                    className={`btn btn-primary waves-effect waves-light ${
                      index === value && "active-btn"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        {/* Card deck */}
        <div className="card-deck row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            {/* Card */}
            <div className="cardc">
              {/*Card content*/}
              <div className="card-body">
                {/*Title*/}
                <h4 className="card-title">1 Card title</h4>
                {/*Text*/}
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <div class="card-body">
                  <h2 class="card-title">This is a title</h2>
                  <p class="card-text">
                    This is body text inside my Bootstrap card. This entire card
                    is a link.
                  </p>
                  <a href="#" class="card-link stretched-link">
                    Learn more
                  </a>
                </div>
                <div class="card-body">
                  <h2 class="card-title">This is a title</h2>
                  <p class="card-text">
                    This is body text inside my Bootstrap card. This entire card
                    is a link.
                  </p>
                  <a href="#" class="card-link stretched-link">
                    Learn more
                  </a>
                </div>
                <div class="card-body">
                  <h2 class="card-title">This is a title</h2>
                  <p class="card-text">
                    This is body text inside my Bootstrap card. This entire card
                    is a link.
                  </p>
                  <a href="#" class="card-link stretched-link">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            {/* Card */}
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            {/* Card */}
            <div className="card mb-4">
              {/*Card image*/}

              {/*Card content*/}
              <div className="card-body">
                {/*Title*/}
                <h4 className="card-title">2 Card title</h4>
                {/*Text*/}
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <div class="cardc text-dark bg-info">
                  <div class="card-header">Header</div>
                  <div class="card-body">
                    <h5 class="card-title">Info card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <div class="cardc text-dark bg-info">
                  <div class="card-header">Header</div>
                  <div class="card-body">
                    <h5 class="card-title">Info card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <div class="cardc text-dark bg-info">
                  <div class="card-header">Header</div>
                  <div class="card-body">
                    <h5 class="card-title">Info card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card */}
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            {/* Card */}
            <div className="card mb-4">
              {/*Card content*/}
              <div className="card-body">
                {/*Title*/}
                <h4 className="card-title">3 Card title</h4>
                {/*Text*/}
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <div className="card-body">
                  <h2 className="card-title">This is a title</h2>
                  <p className="card-text">
                    This is body text inside my Bootstrap card. This entire card
                    is a link.
                  </p>
                </div>
              </div>
            </div>
            {/* Card */}
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            {/* Card */}
            <div className="cardc">
              {/*Card content*/}
              <div className="card-body">
                {/*Title*/}
                <h4 className="card-title">4 Card title</h4>
                {/*Text*/}
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <div>
                  <div className="cards">
                    <div className="cardc">
                      <h3>TITLE HERE</h3>
                      <div className="line" />
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi.
                      </p>
                    </div>
                  </div>

                  <div className="cards">
                    <div className="cardc">
                      <h3>TITLE HERE</h3>
                      <div className="line" />
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi.
                      </p>
                    </div>
                  </div>

                  <div className="cards">
                    <div className="cardc">
                      <h3>TITLE HERE</h3>
                      <div className="line" />
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Card */}
          </div>
        </div>
      </div>

      {/* <div>
        <div className="card m-2" style={{ width: 300 }}>
          <div className="card-header text-center">New Today</div>
          <div className="card-body">
            <div class="card-body">
              <h2 class="card-title">This is a title</h2>
              <p class="card-text">
                This is body text inside my Bootstrap card. This entire card is
                a link.
              </p>
              <a href="#" class="card-link stretched-link">
                Learn more
              </a>
            </div>
            <div class="card-body">
              <h2 class="card-title">This is a title</h2>
              <p class="card-text">
                This is body text inside my Bootstrap card. This entire card is
                a link.
              </p>
              <a href="#" class="card-link stretched-link">
                Learn more
              </a>
            </div>
            <div class="card-body">
              <h2 class="card-title">This is a title</h2>
              <p class="card-text">
                This is body text inside my Bootstrap card. This entire card is
                a link.
              </p>
              <a href="#" class="card-link stretched-link">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "3px",
          padding: "10px",
        }}
      >
        {rooms.map((room, index) => {
          return (
            <div
              className="card"
              style={{ width: "22rem", padding: "0.3rem", marginLeft: "7px" }}
            >
              <div className="card text-white bg-info mb-3" key={index}>
                <div className="card-block">
                  <h6 className="m-b-0">Room ID: {room.id}</h6>
                  <h4 className="m-t-15 m-b-15">{room.title}</h4>
                  <p className="m-b-0">Capacity:{room.capacity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
