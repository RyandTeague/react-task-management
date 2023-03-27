import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "https://task-backend.herokuapp.com/";
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken')
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();