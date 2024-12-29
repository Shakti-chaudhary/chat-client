import axios from "axios";

export const axiosApi = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5505/api"
      : "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// baseURL: "http://localhost:5505/api",
