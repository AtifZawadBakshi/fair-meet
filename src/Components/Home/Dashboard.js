import axios from "axios";
import React, { useEffect, useState } from "react";

import { URL, BOOKING_LIST, API } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import PageHeader from "./PageHeader";
// import "./dash.css";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
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
        setBookings(response.data.data.booking);
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

      <div className="container-fluid">
        <div className="row">
          {rooms.map((room, index) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="card table-card">
                  <div className="card-header">
                    <h5 className="m-b-0">{room.title}</h5>
                    <h6 className="m-b-0">Room ID: {room.id}</h6>
                    <p className="m-b-0">Capacity: {room.capacity}</p>
                  </div>
                  <div className="card-block">
                    <div className="table-responsive">
                      <table className="table table-hover m-b-0 without-header">
                        <tbody>
                          {bookings.map((booking, index) => {
                            if (room.id == booking.room_id)
                              return (
                                <tr>
                                  <td>
                                    <div className="d-inline-block align-middle">
                                      <div className="d-inline-block">
                                        <h6>
                                          <i class="icofont icofont-hand-right text-info"></i>
                                          {booking.agenda}
                                        </h6>
                                        <p className="text-muted m-b-0">
                                          Chaired with : {booking.chaired_with}
                                        </p>
                                        <p className="text-muted m-b-0">
                                          Total Participants:
                                          {booking.no_of_participants}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-right">
                                    <h6 className="f-w-400"></h6>
                                  </td>
                                </tr>
                              );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
