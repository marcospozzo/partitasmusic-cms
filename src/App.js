import "./App.css";
import Header from "./Header.js";
import Contributors from "./Contributors.js";
import Contributor from "./Contributor.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./Protected";
import Login from "./Login.js";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Header />
              <Contributors />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contributors/:path"
          element={
            <Protected>
              <Header />
              <Contributor />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
