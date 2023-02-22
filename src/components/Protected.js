import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/auth";
import { useEffect, useState } from "react";

const Protected = ({ children }) => {
  const [tokenIsValid, setTokenIsValid] = useState("false");

  useEffect(() => {
    (async function () {
      setTokenIsValid(await verifyToken());
    })();
  }, []);

  if (tokenIsValid) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
