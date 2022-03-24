import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { URL, GET_ROOM } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import axios from "axios";
import moment from "moment";
import LiveCheck from "./LiveCheck";

export default function RoomDetails(props) {
  const { id } = props.match.params;
  const [roomName, setRoomName] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [meetings, setMeetings] = useState([]);
  // const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let currentTime = moment().format("HH:mm:ss");
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
      .get(URL + GET_ROOM + "/" + id)
      .then((response) => {
        setMeetings(response.data.data.meeting_list);
        setRoomName(response.data.data.room_details.title);
        setOfficeName(response.data.data.room_details.office.title);
        setLoading(false);
        console.log(currentTime);
      })
      .catch((error) => {
        <section className="section loading">
          Hurraahh!! No Meetings Today !
        </section>;
      });
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <Loader />
      </section>
    );
  }

  // const { id, title, created_at, updated_at, rooms } = offices[value];
  if (meetings == {}) {
    return (
      <section className="section loading">
        Hurraahh!! No Meetings Today !
      </section>
    );
  }
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="page-header-title">
                <h5 className="m-b-10">Room Name: {roomName}</h5>
                <p className="m-b-0">Office Name: {officeName}</p>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="breadcrumb">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-primary btn-sm me-2"
                  style={{ padding: "8px 8px", margin: "5px" }}
                >
                  Return
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-body">
            <div className="row">
              {meetings &&
                meetings.map((meeting, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <div className="card table-card">
                        <div className="card-header">
                          <div className="display-inline-block">
                            <h5 className="m-b-0" style={{ fontSize: "20px" }}>
                              {meeting.meeting_title}
                            </h5>
                          </div>
                          {console.log(currentTime)}
                          {console.log(meeting.start_time.split(" ")[1])}
                          {console.log(meeting.end_time.split(" ")[1])}
                          {currentTime >= meeting.start_time.split(" ")[1] &&
                            currentTime <= meeting.end_time.split(" ")[1] && (
                              <LiveCheck />
                            )}
                          {currentTime < meeting.start_time.split(" ")[1] && (
                            <button className="btn btn-primary btn-sm me-1 ">
                              Upcoming
                            </button>
                          )}
                        </div>

                        <div className="card-block">
                          <table
                            className="table table-border"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>
                                  {": "}
                                  {moment(meeting.start_time).format("LL")}
                                </th>
                              </tr>
                              <tr>
                                <th>Start Time</th>
                                <th>
                                  {": "}
                                  {moment(meeting.start_time)
                                    .add(24, "hours")
                                    .format("h:mm a")}
                                </th>
                              </tr>
                              <tr>
                                <th>End Time</th>
                                <th>
                                  {": "}
                                  {moment(meeting.end_time)
                                    .add(24, "hours")
                                    .format("h:mm a")}
                                </th>
                              </tr>
                              <tr>
                                <th>No. of Participants</th>
                                <th>
                                  {": "}
                                  {meeting.no_of_participants}
                                </th>
                              </tr>
                              <tr>
                                <th>Charied With:</th>
                                <th>
                                  {": "}
                                  {meeting.chaired_with}
                                </th>
                              </tr>
                              <tr>
                                <th>Agenda</th>
                                <th>
                                  {": "}
                                  {meeting.agenda}
                                </th>
                              </tr>
                            </thead>
                          </table>
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
