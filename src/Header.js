import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to="/" className="header">
      <img className="logo" alt="partitas music logo" src="/logo-pm.png"></img>
      <CenterPanel />
      <RightPanel />
    </Link>
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
        className={activeView === "Pieces" ? "selected" : "unselected"}
        onClick={() => setActiveView("Pieces")}
      >
        Pieces
      </button>
    </div>
  );
}

function RightPanel() {
  return <button className="right-panel unselected">Logout</button>;
}
