import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  let [formData, setFormData] = useState({});

  const [booking, setBooking] = useState([]);
  const [title, setTitle] = useState("");
  const [agenda, setAgenda] = useState("");
  const [chairWith, setChairWith] = useState("");
  const [loading, setLoading] = useState(true);
  const [chairno, setChairno] = useState(0);
  const [offices, setOffices] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
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
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
    axios
      .get(URL + GET_BOOKING + "/" + id)
      .then((response) => {
        console.log(response.data.data);
        setFormData(response.data.data);
        setBooking(response.data.data);
        // setTitle(response.data.data.meeting_title);
        // setAgenda(response.data.data.agenda);
        // setChairWith(response.data.data.chaired_with);
        // setChairno(response.data.data.no_of_participants);
        // setEndTime(response.data.data.start_time);
        // setStartTime(response.data.data.end_time);
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
                  <label className="col-sm-2 col-form-label">
                    Meeting Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.meeting_title}
                      name="meeting_title"
                      id="meeting_title"
                      onChange={onChangeInput}
                      aria-describedby="meeting_title"
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                      value={booking.meeting_title}
                    /> */}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Select Office
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="office_id"
                      className="form-control"
                      value={formData.office_id}
                      onChange={onChangeInput}
                    >
                      {/* <option value={booking.office_id}>
                        Prev: {booking.office.title}
                      </option> */}
                      <option name="office_id" value={formData.office_id}>
                        {formData.office.title}*
                      </option>
                      {offices.map((item, index) => {
                        return <option value={item.id}>{item.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Select Meeting Room
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="room.title"
                      className="form-control"
                      value={formData.room.title}
                      onChange={onChangeInput}
                    >
                      <option name="room.title" value={formData.room_id}>
                        {formData.room.title}*
                      </option>
                      {/* <option value={booking.room_id}>
                        Prev: {booking.room.title}
                      </option> */}
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
                  <label className="col-sm-2 col-form-label">
                    Meeting Agenda
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      rows="5"
                      name="agenda"
                      cols="5"
                      class="form-control"
                      value={formData.agenda}
                      onChange={onChangeInput}
                    ></textarea>
                    {/* <textarea
                      rows="5"
                      cols="5"
                      class="form-control"
                      value={booking.agenda}
                      onChange={(e) => setAgenda(e.target.value)}
                    ></textarea> */}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Number of Participants
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      name="no_of_participants"
                      value={formData.no_of_participants}
                      className="form-control"
                      onChange={onChangeInput}
                    />
                    {/* <input
                      type="number"
                      value={booking.no_of_participants}
                      className="form-control"
                      onChange={(e) => setChairno(e.target.value)}
                    /> */}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Starting Time & Date
                  </label>
                  <div className="col-sm-10">
                    <DatePicker
                      selected={formData.start_time}
                      name="start_time"
                      value={formData.start_time}
                      onChange={onChangeInput}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control"
                    />
                    {/* <DatePicker
                      selected={startTime}
                      value={booking.start_time}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control"
                    /> */}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Ending Time & Date
                  </label>
                  <div className="col-sm-10">
                    <DatePicker
                      selected={formData.end_time}
                      value={formData.end_time}
                      onChange={onChangeInput}
                      name="end_time"
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control"
                    />
                    {/* <DatePicker
                      selected={endTime}
                      value={booking.end_time}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="form-control"
                    /> */}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Chair With</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="chaired_with"
                      value={formData.chaired_with}
                      onChange={onChangeInput}
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      value={booking.chaired_with}
                      onChange={(e) => setChairWith(e.target.value)}
                    /> */}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label"></label>
                  <div className="col-sm-10">
                    <button
                      type="submit"
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
