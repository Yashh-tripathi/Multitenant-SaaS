import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // session expired / invalid
        window.location.href = "/login?expired=true";
      }
      return Promise.reject(error);
    }
  );

export default instance;