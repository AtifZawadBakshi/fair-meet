import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL, BOOKING_LIST, SEARCH_BOOKING } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import HeaderPage from "./HeaderPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function CorporateOffice() {
  const [office, setOffice] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(null);
  const today = moment().format("MMMM D, yyyy");
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
      .post(URL + SEARCH_BOOKING, {
        date: today,
      })
      .then((res) => {
        console.log(res.data.data);
        setBookings(res.data.data);
      })
      .catch(function (err) {
        Helper.alertMessage("error", err);
      });
    axios
      .get(URL + BOOKING_LIST)
      .then((response) => {
        setOffice(response.data.data.offices[2]);

        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(schedule);
    axios
      .post(URL + SEARCH_BOOKING, {
        date: schedule,
      })
      .then((res) => {
        console.log(res.data.data);
        setBookings(res.data.data);
      })
      .catch(function (err) {
        Helper.alertMessage("error", err);
      });
  }
  if (loading) {
    return (
      <section className="section loading">
        <Loader />
      </section>
    );
  }
  return (
    <>
      <HeaderPage />
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-body">
            <div className="form-group row mt-3">
              <div className="display-inline-block col-6 col-md-4 col-lg-3">
                <div className="form-control" style={{ display: "flex" }}>
                  <i className="fa fa-calendar mt-2 mr-2 "></i>
                  <DatePicker
                    selected={schedule}
                    onChange={(date) => setSchedule(date)}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect waves-light me-6"
                    onClick={(e) => handleSubmit(e)}
                    style={{ padding: "0px 8px", margin: "1px 2px" }}
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              {office.rooms.map((room, index) => {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-4"
                    key={index}
                    // onClick={(e) => <UpdateBooking meetid={id} />}
                  >
                    <div className="card table-card">
                      <div className="card-header">
                        <div className="display-inline-block">
                          <h5 className="m-b-0">{room.title}</h5>
                          <p className="m-b-0">Room ID: {room.id}</p>
                          <p className="m-b-0">Capacity: {room.capacity}</p>
                        </div>

                        <div className="button">
                          <Link
                            to={"/room-details/" + room.id}
                            className="btn btn-primary btn-sm me-2"
                            style={{ padding: "3px 3px", margin: "2px" }}
                          >
                            Details
                          </Link>
                        </div>
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
                                            <p className="text-muted m-b-0">
                                              Date:{" "}
                                              {moment(booking.start_time)
                                                // .add(24, "hours")
                                                .format("LL")}
                                            </p>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="text-right">
                                        <p className="text-muted m-b-0">
                                          Start Time:{" "}
                                          {moment(booking.start_time)
                                            // .add(24, "hours")
                                            .format("h:mm a")}
                                        </p>
                                        <p className="text-muted m-b-0">
                                          End Time:{" "}
                                          {moment(booking.end_time)
                                            // .add(24, "hours")
                                            .format("h:mm a")}
                                        </p>
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
      </div>
    </>
  );
}
