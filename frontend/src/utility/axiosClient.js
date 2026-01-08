import axios from "axios"
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials : true, // inform browser to attch cookie with it
  headers: {'Content-Type': 'application/json'}
});
