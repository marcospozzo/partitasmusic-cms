import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";

export default function Contributor() {
  const navigate = useNavigate();
  const { path } = useParams();
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
  }, [navigate, path]);

  return (
    <div className="contributor-edit">
      <img className="profile-picture" alt="test" src={data.picture}></img>
      <label>Name: </label>
      <input className="input-box input-contributor" value={data.name} />
      <label>Sort: </label>
      <input className="input-box input-contributor" value={data.sort} />
      <label>Country: </label>
      <input className="input-box input-contributor" value={data.name} />
      <label>Bio: </label>
      <input className="input-box input-contributor" value={data.sort} />
      <label>Contact: </label>
      <input className="input-box input-contributor" value={data.contact} />
      <label>Donate: </label>
      <input className="input-box input-contributor" value={data.donate} />
      <label>Category: </label>
      <input className="input-box input-contributor" value={data.category} />
      <label>Path: </label>
      <input className="input-box input-contributor" value={data.path} />
    </div>
  );
}
