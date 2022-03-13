import axios from "axios";
import React, { useEffect, useState } from "react";

import { URL, BOOKING_LIST, GET_BOOKING } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import PageHeader from "./PageHeader";
// import "./dash.css";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [offices, setOffices] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [hasData, setHasData] = useState(false);

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

  function editMeeting(id) {
    // console.log("edit meeting id", id);
    axios
      .get(URL + GET_BOOKING + "/" + id)
      .then((response) => {
        console.log(response.data.data);
        setFormData(response.data.data);
        setHasData(true);
      })
      .catch((error) => {
        Helper.alertMessage("error", error);
      });
  }
  // if (setHasData) return console.log(formData);
  return (
    <>
      <PageHeader />
      <div className="pcoded-inner-content">
        <div className="card">
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
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {rooms.map((room, index) => {
                    return (
                      <div
                        className="col-12 col-md-6 col-lg-4"
                        key={index}
                        // onClick={(e) => <UpdateBooking meetid={id} />}
                      >
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
                                                  {booking.meeting_title}
                                                </h6>
                                                <p className="text-muted m-b-0">
                                                  Agenda : {booking.agenda}
                                                </p>
                                                <p className="text-muted m-b-0">
                                                  Chaired with :
                                                  {booking.chaired_with}
                                                </p>
                                                <p className="text-muted m-b-0">
                                                  Total Participants:
                                                  {booking.no_of_participants}
                                                </p>
                                              </div>
                                            </div>
                                          </td>

                                          <td className="text-right">
                                            {booking.start_time}
                                          </td>
                                          {/* 
                                      <td className="text-right">
                                        <button
                                          onClick={() =>
                                            editMeeting(booking.id)
                                          }
                                          className="btn btn-success btn-sm me-2"
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop"
                                          style={{
                                            padding: "2px",
                                            margin: "2px",
                                          }}
                                        >
                                          <i class="fas fa-edit"></i>
                                        </button>
                                      </td> */}
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

              {/* <div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
