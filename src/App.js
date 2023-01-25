import "./App.css";
import Header from "./Header.js";
import Contributors from "./Contributors.js";
import Contributor from "./Contributor.js";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Contributors />} />
        <Route path="/contributors/:path" element={<Contributor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
