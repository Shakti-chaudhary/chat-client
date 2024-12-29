import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://chatserverimessage.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
