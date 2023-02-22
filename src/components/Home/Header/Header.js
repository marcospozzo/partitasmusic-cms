import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/auth";

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

function CenterPanel() {
  const [activeView, setActiveView] = useState("Contributors");

  return (
    <div className="center-panel">
      <button
        className={activeView === "Contributors" ? "selected" : "unselected"}
        onClick={() => setActiveView("Contributors")}
      >
        Contributors
      </button>
      <button
        className={activeView === "Users" ? "selected" : "unselected"}
        onClick={() => setActiveView("Users")}
      >
        Users
      </button>
    </div>
  );
}

function RightPanel() {
  const navigate = useNavigate();

  async function handleClick() {
    await logout();
    navigate("/login");
  }
  return (
    <button onClick={handleClick} className="right-panel unselected">
      Logout
    </button>
  );
}
