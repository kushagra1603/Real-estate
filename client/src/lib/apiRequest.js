import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-1-iax5.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
