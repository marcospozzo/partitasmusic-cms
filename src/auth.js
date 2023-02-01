import axios from "axios";

export async function login(username, password) {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}api/signin`,
    {
      username,
      password,
    }
  );
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
