import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL, BOOKING_LIST } from "../../Axios/Api";
import * as Helper from "../Utility/Helper";
import OfficeList from "./OfficeList";

export default function Dashboard() {
  const [offices, setOffices] = useState([]);
  // const [officeNames, setofficeNames] = useState({});
  // const [officeRooms, setOfficeRooms] = useState({});
  let officeNames = [];
  let officeRooms = [];

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
        Helper.alertMessage("error", "ROOM API not working!");
      });
  }, []);

  return (
    // <div>This is dashboard</div>

    <div className="card">
      <div className="card-header">
        <h5>Scheduled Meetings</h5>
      </div>
      <div className="card-block">
        {offices.map((office) => {
          officeNames = [...officeNames, office.title];
          office.rooms.map((room) => {
            officeRooms = [...officeRooms, room];
          });
        })}
        {console.log(officeNames)}
        {console.log(officeRooms)}
        {/* <OfficeList list={officeNames} /> */}
        {/* <ul className="nav nav-tabs md-tabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#home3"
              role="tab"
            >
              Home
            </a>
            <div className="slide" />
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#profile3"
              role="tab"
            >
              Profile
            </a>
            <div className="slide" />
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#messages3"
              role="tab"
            >
              Messages
            </a>
            <div className="slide" />
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#settings3"
              role="tab"
            >
              Settings
            </a>
            <div className="slide" />
          </li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content card-block">
          <div className="tab-pane active" id="home3" role="tabpanel">
            <p className="m-0">
              1. This is Photoshop's version of Lorem IpThis is Photoshop's
              version of Lorem Ipsum. Proin gravida nibh vel velit auctor
              aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi
              elit consequat ipsum, nec sagittis sem nibh id elit. Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean mas Cum sociis natoque penatibus et
              magnis dis.....
            </p>
          </div>
          <div className="tab-pane" id="profile3" role="tabpanel">
            <p className="m-0">
              2.Cras consequat in enim ut efficitur. Nulla posuere elit quis
              auctor interdum praesent sit amet nulla vel enim amet. Donec
              convallis tellus neque, et imperdiet felis amet.
            </p>
          </div>
          <div className="tab-pane" id="messages3" role="tabpanel">
            <p className="m-0">
              3. This is Photoshop's version of Lorem IpThis is Photoshop's
              version of Lorem Ipsum. Proin gravida nibh vel velit auctor
              aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi
              elit consequat ipsum, nec sagittis sem nibh id elit. Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean mas Cum sociis natoque penatibus et
              magnis dis.....
            </p>
          </div>
          <div className="tab-pane" id="settings3" role="tabpanel">
            <p className="m-0">
              4.Cras consequat in enim ut efficitur. Nulla posuere elit quis
              auctor interdum praesent sit amet nulla vel enim amet. Donec
              convallis tellus neque, et imperdiet felis amet.
            </p>
          </div>
        </div>{" "}
        */}
      </div>
    </div>
  );
}
