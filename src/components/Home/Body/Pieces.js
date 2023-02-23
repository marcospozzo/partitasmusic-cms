import { useNavigate } from "react-router-dom";
import Piece from "./Piece";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Pieces({ path }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/get-contributions/${path}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  }, [navigate, path]);

  return (
    <div className="pieces">
      <h3 style={{ alignSelf: "center", fontWeight: "lighter" }}>Pieces</h3>
      {data.map((piece) => {
        return <Piece key={piece._id} piece={piece} />;
      })}
      <Piece path={path} />
    </div>
  );
}
