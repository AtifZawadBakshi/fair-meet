import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL, BOOKING_LIST, BOOKING_STORE } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageHeader from "./PageHeader";

export default function CrateBooking(props) {
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
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(URL + BOOKING_STORE, {
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
        props.history.push("/dashboard");
        Helper.alertMessage("success", "Successfully Added");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }

  return (
    <>
      <PageHeader />
      <div className="pcoded-inner-content">
        <div className="card">
          <div className="card-header">
            <h5>Book A Room for Meeting</h5>
          </div>
          <div className="card-block">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Meeting Title</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Type Meeting Title"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Select Office</label>
                <div className="col-sm-10">
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
                <label className="col-sm-2 col-form-label">
                  Select Meeting Room
                </label>
                <div className="col-sm-10">
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
                <label className="col-sm-2 col-form-label">
                  Meeting Agenda
                </label>
                <div className="col-sm-10">
                  <textarea
                    rows="5"
                    cols="5"
                    class="form-control"
                    placeholder="Meeting Agenda"
                    onChange={(e) => setAgenda(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Number of Participants
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setChairno(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Starting Time & Date
                </label>
                <div className="col-sm-10">
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Ending Time & Date
                </label>
                <div className="col-sm-10">
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Chair With</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type name"
                    onChange={(e) => setChairWith(e.target.value)}
                  />
                </div>
              </div>
              {/* 
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Disable Input</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Disabled text"
                disabled
              />
            </div>
          </div> */}

              <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect waves-light"
                    // onClick={(e) => handleSubmit(e)}
                  >
                    <i className="fa fa-save"></i> Save Meeting
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
