import axios from "axios";

const API_URL = "http://localhost:3001/api/";

export async function login(username, password) {
  const response = await axios.post(API_URL + "signin", {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("jwt", JSON.stringify(response.data.accessToken));
  }
  return response.data;
}

export async function logout() {
  localStorage.removeItem("jwt");
}

export function authHeader() {
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  if (jwt) {
    return { "x-access-token": jwt }; // for Node.js Express back-end
  } else {
    return {};
  }
}
