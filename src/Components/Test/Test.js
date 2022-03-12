import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import {
  URL,
  BOOKING_LIST,
  GET_BOOKING,
  DELETE_BOOKING,
} from "../../Axios/Api";

export default function Test() {
  let [formData, setFormData] = useState({});
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
      .get(URL + BOOKING_LIST)
      .then((response) => {
        setFormData(response.data.data.booking);
        setLoading(false);
        console.log(response.data.data.booking);
      })
      .catch(function (error) {
        Helper.alertMessage("error", "BOOKING_LIST API not working!");
      });
  }, []);

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function BookingList() {
    axios
      .get(URL + BOOKING_LIST)
      .then((response) => {
        setFormData(response.data.data.booking);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", "BOOKING_LIST API not working!");
      });
  }

  function editItem(id) {
    axios
      .get(URL + GET_BOOKING + "/" + id)
      .then((response) => {
        // setFormData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
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
    <div className="card">
      <div className="card-header">
        <h5>Bookings List</h5>
      </div>
      <div className="card-block">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-end pb-2">
              <input
                type="search"
                id="searchInput"
                onKeyUp={Helper.tableSearch}
                placeholder="Search Here"
                className="form-control"
              />
            </div>
          </div>
          <div className="table-responsive">
            <table id="myTable" className="display table table-striped">
              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Meeting Title</th>
                  <th>Office</th>
                  <th>Room</th>
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
                    <td> {val.chaired_with}</td>
                    <td>
                      <button
                        onClick={() => editItem(val.id)}
                        className="btn btn-success btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete the item?")) {
                            deleteItem(val.id);
                          }
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
