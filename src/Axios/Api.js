import axios from "axios";

export const URL = "http://10.100.10.74/meeting_booking/api/";
export const USER_LOGIN = "user/login";
export const PROFILE = "user/profile";
export const LOGIN = "user/login";
export const LOGOUT = "user/logout";
export const PROFILE_UPDATE = "user/profile/update";
export const BOOKING_STORE = "user/booking-store";
export const GET_BOOKING = "user/booking-details";
export const BOOKING_LIST = "user/room-show";
export const CREATE_BOOKING = "user/booking-create";
export const DELETE_BOOKING = "user/booking-delete";

const API = async (config) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "net work error",
          status: 500,
        };
      }
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  config.baseURL = URL;
  return axios(config);
};

export default API;
