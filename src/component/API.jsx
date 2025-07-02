import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-backened.onrender.com",
});

export default API;