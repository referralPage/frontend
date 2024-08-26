import axios from "axios";

export const API = axios.create({
  // baseURL: "http://3.35.18.18/",
  baseURL: "https://referral.retri.xyz/",
  headers: {
    Accept: "*/*",
  },
});

// Function to set the Authorization token
// function setAuthToken(id) {
//   API.defaults.headers.common["Authorization"] = `Bearer ${id}`;
// }