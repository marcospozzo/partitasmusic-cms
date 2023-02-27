import { Navigate } from "react-router-dom";
import { axiosInstance } from "../utils/utils";
import { useEffect, useState } from "react";

const Protected = ({ children }) => {
  const [tokenIsValid, setTokenIsValid] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axiosInstance.get("/verifyToken");
        setTokenIsValid(response.status === 200);
      } catch (error) {
        setTokenIsValid(false);
      }
    })();
  }, []);

  return tokenIsValid === null ? (
    <div></div>
  ) : tokenIsValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default Protected;
