import { login } from "./auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      navigate("/");
    } catch (err) {
      return toast.error("Login failed");
    }
  }

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="username"
          onChange={handleChange}
          autoFocus
          className="input-box input-contributor"
          placeholder="email"
        ></input>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="input-box input-contributor"
          placeholder="password"
        ></input>
        <button type="submit" className="unselected">
          Login
        </button>
      </form>
    </>
  );
}
