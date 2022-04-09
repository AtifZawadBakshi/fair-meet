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
  const [title, setTitle] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const [chairWith, setChairWith] = useState(null);
  const [chairno, setChairno] = useState(0);
  const [endTime, setEndTime] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);

  useEffect(async () => {
    let auth_check = JSON.parse(localStorage.getItem("user"));
    const token = auth_check.access_token || null;
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
        // console.log(response.data.data.offices);
        setOffices(response.data.data.offices);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
    await axios
      .get(URL + GET_BOOKING + "/" + id)
      .then((response) => {
        // console.log(response.data.data);
        setFormData(response.data.data);
        // formData.meeting_title = "New Meeting Title";
        setTitle(response.data.data.meeting_title);
        setAgenda(response.data.data.agenda);
        setChairWith(response.data.data.chaired_with);
        setChairno(response.data.data.no_of_participants);
        setStartTime(new Date(response.data.data.start_time));
        setEndTime(new Date(response.data.data.end_time));
        setSelectedOffice(response.data.data.office_id);
        setSelectedRoom(response.data.data.room_id);
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

  // const onChangeInput = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setFormData({
  //     ...formData,
  //     ["id"]: id,
  //   });
  //   setFormData({
  //     ...formData,
  //     ["end_time"]: moment(endTime).format("MMMM D, yyyy"),
  //   });
  //   setFormData({
  //     ...formData,
  //     ["start_time"]: moment(startTime).format("MMMM D, yyyy"),
  //   });
  //   console.log(formData);
  //   axios
  //     .post(URL + UPDATE_BOOKING, formData)
  //     .then((res) => {
  //       // console.log(res);
  //       props.history.push("/booking-list");
  //       Helper.alertMessage("success", "Successfully Updated");
  //     })
  //     .catch(function (res) {
  //       Helper.alertMessage("error", res);
  //     });
  // }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    axios
      .post(URL + UPDATE_BOOKING, {
        id: id,
        office_id: selectedOffice,
        room_id: selectedRoom,
        meeting_title: title,
        agenda: agenda,
        start_time: startTime,
        end_time: endTime,
        no_of_participants: chairno,
        chaired_with: chairWith,
      })
      .then((res) => {
        console.log(res);
        props.history.push("/booking-list");
        Helper.alertMessage("success", "Successfully Updated");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
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
                      value={title}
                      type="text"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Select Office<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="select"
                      className="form-control"
                      value={selectedOffice}
                      onChange={(e) => setSelectedOffice(e.target.value)}
                    >
                      <option value="">Choose Office</option>
                      {offices.map((item, index) => {
                        return <option value={item.id}>{item.title}</option>;
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
                      name="select"
                      className="form-control"
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                    >
                      <option value="">Choose Room</option>
                      {offices.map((office, index) => {
                        if (office.id == selectedOffice)
                          return office.rooms.map((room, index) => {
                            return (
                              <option value={room.id}>
                                {room.title}(Max Capacity: {room.capacity})
                              </option>
                            );
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
                      value={agenda}
                      onChange={(e) => setAgenda(e.target.value)}
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
                      value={chairno}
                      className="form-control"
                      onChange={(e) => setChairno(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Starting Time & Date<span style={{ color: "red" }}>*</span>
                  </label>

                  <div className="col-sm-9">
                    <DatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Ending Time & Date<span style={{ color: "red" }}>*</span>
                  </label>

                  <div className="col-sm-9">
                    <DatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minDate={new Date()}
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
                      value={chairWith}
                      onChange={(e) => setChairWith(e.target.value)}
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
