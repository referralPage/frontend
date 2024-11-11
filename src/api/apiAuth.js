import axios from "axios";
axios.defaults.withCredentials = true;
export const API = axios.create({
  // baseURL: "http://3.35.18.18/",
  baseURL: "https://referral.tryex.xyz/",
  headers: {
    Accept: "*/*",
  },
  // withCredentials: true,
});

// Function to set the Authorization token
// function setAuthToken(id) {
//   API.defaults.headers.common["Authorization"] = `Bearer ${id}`;
// }