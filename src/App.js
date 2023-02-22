import "./App.css";
import Header from "./Header.js";
import Contributors from "./Contributors.js";
import Contributor from "./Contributor.js";
import ContributorEdit from "./ContributorEdit";
import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./Protected";
import Login from "./Login.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
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
          path="/new-contributor"
          element={
            <Protected>
              <Header />
              <Contributor />
            </Protected>
          }
        />
        <Route
          path="/contributors/:path"
          element={
            <Protected>
              <Header />
              <ContributorEdit />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
