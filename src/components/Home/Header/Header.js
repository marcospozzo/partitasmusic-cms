import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERS, CONTRIBUTORS } from "../../../utils/constants";

function CenterPanel() {
  const [activeView, setActiveView] = useState(CONTRIBUTORS);

  return (
    <div className="center-panel">
      <button
        className={activeView === CONTRIBUTORS ? "selected" : "unselected"}
        onClick={() => setActiveView(CONTRIBUTORS)}
      >
        {CONTRIBUTORS}
      </button>
      <button
        className={activeView === USERS ? "selected" : "unselected"}
        onClick={() => setActiveView(USERS)}
      >
        {USERS}
      </button>
    </div>
  );
}

function RightPanel() {
  const navigate = useNavigate();

  async function handleClick() {
    localStorage.removeItem("jwt");
    navigate("/login");
  }
  return (
    <button onClick={handleClick} className="right-panel unselected">
      Logout
    </button>
  );
}

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo"
          alt="partitas music logo"
          src="/logo-pm.png"
        ></img>
      </Link>
      <CenterPanel />
      <RightPanel />
    </div>
  );
}
