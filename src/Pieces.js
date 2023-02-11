import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";
import axios from "axios";
import { authHeader } from "./auth";
import { toast } from "react-toastify";
import Piece from "./Piece";

export default function Pieces({ path }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function handleInputChange(e) {
    // e.target.value === "" && (e.target.value = data[e.target.name]); // does not quite work, but almost
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    fetchApi(`${process.env.REACT_APP_API_URL}api/get-contributions/${path}`)
      .then((data) => {
        data.sortBy = data.sort; // this fixes error that makes compiler think sort is a function and can't be rendered
        setData(data);
      })
      .catch((err) => {
        navigate("/");
      });
  }, [navigate, path]);

  return (
    <div className="pieces">
      {data.map((piece) => {
        return (
          <Piece
            key={piece._id}
            piece={piece}
            handleOnChange={handleInputChange}
          />
        );
      })}
    </div>
  );
}
