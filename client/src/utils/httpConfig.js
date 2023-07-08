import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5500",
});

export default httpClient;
