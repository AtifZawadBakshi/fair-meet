import axios from "axios";

export const URL = "http://192.168.0.125/fair_meeting/api/";
export const USER_LOGIN = "user/login";

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
