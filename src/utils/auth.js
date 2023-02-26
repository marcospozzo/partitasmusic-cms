import { axiosInstance } from "./utils";

export async function login(username, password) {
  try {
    const response = await axiosInstance.post("/signin", {
      username,
      password,
    });
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

export async function verifyToken() {
  try {
    const response = await axiosInstance.get("/verifyToken");
    return response.status === 200;
  } catch (error) {
    console.error("Invalid token. Log in again.");
    return false;
  }
}
