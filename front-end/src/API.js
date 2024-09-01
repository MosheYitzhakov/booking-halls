import axios from "axios";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3335/api/"
    : "/api/";
console.log(url);
const instance = axios.create({
  baseURL: url,
});
export default instance;
