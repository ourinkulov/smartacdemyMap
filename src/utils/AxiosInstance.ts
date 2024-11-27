import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/dataStored/authReducer";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.VITE_APP_BASE_URL!,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (config.method === "get" || config.method === "GET") {
        const lang =
          store.getState().auth.language.toLowerCase() !== "cr"
            ? store.getState().auth.language.toLowerCase()
            : "uk";
        config.params = {
          ...config.params,
          language: lang,
        };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error.response ? error.response.status : null;
    if (!navigator.onLine) {
      store.dispatch(logout());
      toast.error("Internet bilan aloqa yo'q!");
    } else {
      if (status === 401) {
        toast.error("Sessiya vaqti tugadi!");
        store.dispatch(logout());
      } else {
        toast.error(error.response.data.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
