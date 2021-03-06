import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import PageHeader from "./PageHeader";
import { Link } from "react-router-dom";
import { Button, MyVerticallyCenteredModal } from "react-modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import moment from "moment";
import {
  URL,
  BOOKING_LIST,
  GET_BOOKING,
  DELETE_BOOKING,
} from "../../Axios/Api";

export default function Test() {
  let [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [offices, setOffices] = useState([]);
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
    BookingList();
  }, []);

  function BookingList() {
    axios
      .get(URL + BOOKING_LIST)
      .then((response) => {
        setFormData(response.data.data.booking);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }

  function deleteItem(id) {
    axios
      .get(URL + DELETE_BOOKING + "/" + id)
      .then((response) => {
        BookingList();
        Helper.alertMessage("success", "Successfully Deleted");
      })
      .catch((error) => {
        Helper.alertMessage("error", error);
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
      <PageHeader />
      <div className="pcoded-inner-content">
        <div className="card">
          <div className="card-header">
            <h5>Update Bookings</h5>
          </div>
          <div className="card-block">
            <div className="card-body">
              <div className="mb-4 row">
                <div className="col-md-4 text-end pb-2">
                  <input
                    type="search"
                    id="searchInput"
                    onKeyUp={Helper.tableSearch}
                    placeholder="Search Anything"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table id="myTable" className="table table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>SL.</th>
                      <th>Meeting Title</th>
                      <th>Office Name</th>
                      <th>Room Name</th>
                      <th>Date</th>
                      <th>Chaired With</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.map((val, index) => (
                      <tr>
                        <td> {index + 1}</td>
                        <td> {val.meeting_title}</td>
                        <td> {val.office.title}</td>
                        <td> {val.room.title}</td>
                        <td>
                          {" "}
                          {moment(val.start_time).format("MMMM D, yyyy")}
                        </td>

                        <td> {val.chaired_with}</td>
                        <td>
                          <Link
                            to={"/update-booking/" + val.id}
                            className="btn btn-inverse btn-sm me-2"
                            style={{ padding: "3px 3px", margin: "2px" }}
                          >
                            <i
                              className="fas fa-edit"
                              style={{ padding: "3px 3px", margin: "2px" }}
                            ></i>
                          </Link>

                          <button
                            onClick={() => {
                              if (window.confirm("Delete the item?")) {
                                return deleteItem(val.id);
                              }
                            }}
                            className="btn btn-danger btn-sm"
                            style={{ padding: "3px 3px", margin: "2px" }}
                          >
                            <i
                              className="fas fa-trash"
                              style={{ padding: "3px 3px", margin: "2px" }}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <Stack spacing={2}>
                <Pagination count={10} color="primary" />
              </Stack> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
