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
      <InputRow label="Name" value={data.name} />
      <InputRow label="Sort" value={data.sort} />
      <InputRow label="Country" value={data.country} />
      <InputRow label="Bio" value={data.bio} />
      <InputRow label="Contact" value={data.contact} />
      <InputRow label="Donate" value={data.donate} />
      <InputRow label="Category" value={data.category} />
      <InputRow label="Path" value={data.path} />
    </div>
  );
}

function InputRow({ label, value }) {
  return (
    <div className="input-row">
      <label>{label}</label>
      <input className="input-box input-contributor" value={value} />
    </div>
  );
}
