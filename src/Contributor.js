import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";

export default function Contributor() {
  const { path } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi(`http://localhost:3001/api/get-contributor/${path}`)
      .then((data) => {
        // console.log(data);
        setData(data);
      })
      .catch((err) => {
        navigate("/");
        // console.error("error fetching api...");
        // console.error(err.message);
      });
  }, []);

  return <img alt="test" src={data.picture}></img>;
}
