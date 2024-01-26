import axios from "axios";

const api = axios.create({
  baseURL: "https://shchuna-ae1def17ad82.herokuapp.com/api/",
});

export default api;
