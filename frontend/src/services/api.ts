// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "/api",  // since Vite proxy forwards "/api" to backend
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
