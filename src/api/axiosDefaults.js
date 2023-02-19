import axios from "axios";

axios.defaults.baseURL = "https://task-backend.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "text/plain;charset=utf-8";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();