import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL, GET_ROOM } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import axios from "axios";

export default function RoomDetails(props) {
  const { id } = props.match.params;
  const [roomName, setRoomName] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [meetings, setMeetings] = useState([]);
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
      .get(URL + GET_ROOM + "/" + id)
      .then((response) => {
        setMeetings(response.data.data.meeting_list);
        setRoomName(response.data.data.room_details.title);
        setOfficeName(response.data.data.room_details.office.title);
        setLoading(false);
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
              <ul className="breadcrumb"></ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
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
                            <h5 className="m-b-0">{meeting.meeting_title}</h5>
                          </div>
                        </div>

                        <div className="card-block">
                          <div className="table-responsive">
                            <table className="table table-hover m-b-0 without-header">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-inline-block align-middle">
                                      <div className="d-inline-block">
                                        <h6>Agenda : {meeting.agenda}</h6>
                                        <p className="text-muted m-b-0">
                                          Chaired with : {meeting.chaired_with}
                                        </p>

                                        <p className="text-muted m-b-0">
                                          Total Participants:
                                          {meeting.no_of_participants}
                                        </p>
                                        <p className="text-muted m-b-0">
                                          Start Time :{meeting.start_time}
                                        </p>
                                        <p className="text-muted m-b-0">
                                          End Time :{meeting.end_time}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
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
