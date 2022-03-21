import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  URL,
  GET_BOOKING,
  BOOKING_LIST,
  UPDATE_BOOKING,
} from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UpdateBooking(props) {
  const { id } = props.match.params;
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [offices, setOffices] = useState([]);
  // let [title, setTitle] = useState("");
  // let [agenda, setAgenda] = useState("");
  // let [chairWith, setChairWith] = useState("");
  // let [chairno, setChairno] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  // let [selectedOffice, setSelectedOffice] = useState(0);
  // let [selectedRoom, setSelectedRoom] = useState(0);

  useEffect(async () => {
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
    await axios
      .get(URL + BOOKING_LIST)
      .then((response) => {
        console.log(response.data.data.offices);
        setOffices(response.data.data.offices);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
    await axios
      .get(URL + GET_BOOKING + "/" + id)
      .then((response) => {
        console.log(response.data.data);
        setFormData(response.data.data);
        // formData.meeting_title = "New Meeting Title";
        // setTitle(response.data.data.meeting_title);
        // setAgenda(response.data.data.agenda);
        // setChairWith(response.data.data.chaired_with);
        // setChairno(response.data.data.no_of_participants);

        {
          console.log(
            moment(response.data.data.start_time).format("MMMM D, yyyy h:mm A")
          );
        }
        {
          console.log(
            moment(response.data.data.end_time).format("MMMM D, yyyy h:mm A")
          );
        }

        setStartTime(
          moment(response.data.data.start_time).format("MMMM D, yyyy h:mm A")
        );
        setEndTime(
          moment(response.data.data.end_time).format("MMMM D, yyyy h:mm A")
        );
        // setSelectedOffice(response.data.data.office_id);
        // setSelectedRoom(response.data.data.room_id);
        setLoading(false);
      })
      .catch((error) => {
        Helper.alertMessage("error", error);
      });
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <Loader />
      </section>
    );
  }

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormData({ ...formData, ["id"]: id });
    setFormData({ ...formData, ["start_time"]: startTime });
    setFormData({ ...formData, ["end_time"]: endTime });
    axios
      .post(URL + UPDATE_BOOKING, formData)
      .then((res) => {
        console.log(res);
        props.history.push("/booking-list");
        Helper.alertMessage("success", "Successfully Updated");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   axios
  //     .post(URL + UPDATE_BOOKING, {
  //       id: id,
  //       office_id: selectedOffice,
  //       room_id: selectedRoom,
  //       meeting_title: title,
  //       agenda: agenda,
  //       start_time: startTime,
  //       end_time: endTime,
  //       no_of_participants: chairno,
  //       chaired_with: chairWith,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       props.history.push("/booking-list");
  //       Helper.alertMessage("success", "Successfully Updated");
  //     })
  //     .catch(function (res) {
  //       Helper.alertMessage("error", res);
  //     });
  // }
  return (
    <div>
      <>
        <div className="pcoded-inner-content">
          <div className="card">
            <div className="card-header">
              <h5>Edit Booking</h5>
            </div>
            <div className="card-block">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Meeting Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="meeting_title"
                      value={formData.meeting_title}
                      type="text"
                      className="form-control"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Select Office<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="office_id"
                      className="form-control"
                      value={formData.office_id}
                      onChange={onChangeInput}
                    >
                      <option>{formData.office.title}</option>
                      {offices.map((item, index) => {
                        if (formData.office.title !== item.title) {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Select Meeting Room<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="room_id"
                      className="form-control"
                      // value={selectedRoom}
                      value={formData.room_id}
                      onChange={onChangeInput}
                    >
                      <option>{formData.room.title}</option>

                      {offices.map((office, index) => {
                        if (office.id == formData.office_id)
                          return office.rooms.map((room, index) => {
                            if (room.title != formData.room.title) {
                              return (
                                <option key={room.id} value={room.id}>
                                  {room.title}(Max Capacity: {room.capacity})
                                </option>
                              );
                            }
                          });
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Meeting Agenda<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      rows="5"
                      cols="5"
                      class="form-control"
                      name="agenda"
                      value={formData.agenda}
                      onChange={onChangeInput}
                    ></textarea>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Number of Participants
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      name="no_of_participants"
                      value={formData.no_of_participants}
                      className="form-control"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Starting Time & Date<span style={{ color: "red" }}>*</span>
                  </label>
                  {/* {console.log(formData.start_time)} */}
                  {console.log(startTime)}
                  <div className="col-sm-9">
                    <DatePicker
                      value={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      dateFormat="MMMM D, yyyy h:mm A"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Ending Time & Date<span style={{ color: "red" }}>*</span>
                  </label>
                  {/* {console.log(formData.end_time)} */}
                  {console.log(endTime)}
                  <div className="col-sm-9">
                    <DatePicker
                      value={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      dateFormat="MMMM D, yyyy h:mm A"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Chair With<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="chaired_with"
                      value={formData.chaired_with}
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
                <div className="form-group row ">
                  <label className="col-sm-3 col-form-label"></label>

                  <div className="col-sm-9">
                    <button
                      type="submit"
                      style={{ margin: "5px" }}
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Update
                    </button>
                    <Link
                      to="/booking-list"
                      className="btn btn-danger waves-effect waves-light"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
