import axios from "axios";

export async function login(username, password) {
  try {
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
    return response;
  } catch (error) {
    throw new Error();
  }
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

export async function verifyToken() {
  try {
    const config = {
      headers: authHeader(),
    };
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}api/verifyToken`,
      config
    );
    return response.status === 200;
  } catch (error) {
    console.error("Invalid token. Log in again.");
    return false;
  }
}
