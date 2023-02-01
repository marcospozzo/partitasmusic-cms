import { Navigate } from "react-router-dom";
import { Buffer } from "buffer";

const Protected = ({ children }) => {
  const jwt = localStorage.getItem("jwt");

  function isNotExpired(jwt) {
    const expirationPart = jwt.split(".")[1];
    const milliseconds = JSON.parse(
      Buffer.from(expirationPart, "base64").toString("ascii")
    ).exp;
    return milliseconds * 1000 > Date.now();
  }

  if (jwt && isNotExpired(jwt)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
