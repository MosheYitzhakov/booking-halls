import axios from "axios";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3335/api/"
    : process.env.REACT_APP_RENDER_EXTERNAL_URL + "/api/";
console.log(url);
const instance = axios.create({
  baseURL: url,
});
export default instance;