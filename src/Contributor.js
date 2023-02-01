import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";
import axios from "axios";
import { authHeader } from "./auth";

export default function Contributor() {
  const navigate = useNavigate();
  const { path } = useParams();
  const [data, setData] = useState([]);

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    let config = {
      headers: authHeader(),
    };
    e.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}api/update-contributor`,
      data,
      config
    );
    console.log(response);
  }

  useEffect(() => {
    fetchApi(`${process.env.REACT_APP_API_URL}api/get-contributor/${path}`)
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
    <form onSubmit={handleSubmit} className="contributor-edit">
      <EditableTitle name={data.name} handleOnChange={handleInputChange} />
      {/* <input name="picture" value="test" type="hidden"></input> */}
      <img className="profile-picture" alt={data.name} src={data.picture}></img>
      <InputRow
        handleOnChange={handleInputChange}
        label="Sort"
        value={data.sort}
      />
      <InputRow
        handleOnChange={handleInputChange}
        label="Country"
        value={data.country}
      />
      <div className="input-row">
        <label>Bio</label>
        <textarea
          name="bio"
          onChange={handleInputChange}
          className="input-box input-contributor"
          defaultValue={data.bio}
        ></textarea>
      </div>
      <InputRow
        handleOnChange={handleInputChange}
        label="Contact"
        value={data.contact}
      />
      <InputRow
        handleOnChange={handleInputChange}
        label="Donate"
        value={data.donate}
      />
      <div className="input-row">
        <label>Category</label>
        <select
          name="category"
          onChange={handleInputChange}
          className="input-box input-contributor"
          value={data.category}
          defaultValue=""
        >
          <option hidden disabled value=""></option>
          <option value="group">group</option>
          <option value="individual">individual</option>
        </select>
      </div>
      <InputRow
        handleOnChange={handleInputChange}
        label="Path"
        value={data.path}
      />
      <input
        type="submit"
        className="submit-button"
        value="Save changes"
      ></input>
    </form>
  );
}

function EditableTitle({ name, handleOnChange }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleOnClick(e) {
    // e.target.value === "" && (e.target.value = name);
    setIsEditing(!isEditing);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleOnClick();
    }
  }

  return (
    <>
      <input
        name="name"
        onChange={handleOnChange}
        defaultValue={name}
        onBlur={handleOnClick}
        onKeyDown={handleKeyDown}
        className="input-box input-contributor"
        type={isEditing ? "text" : "hidden"}
        autoFocus // this line is not doing anything because the element is not being mounted on time
        ref={(input) => input && input.focus()} // fix for autoFocus not working because of render times
      />
      {!isEditing && (
        <button onClick={handleOnClick} className="editable-title">
          {name}
        </button>
      )}
    </>
  );
}

function InputRow({ label, value, handleOnChange }) {
  return (
    <div className="input-row">
      <label>{label}</label>
      <input
        name={label.toLowerCase()}
        type="text"
        className="input-box input-contributor"
        defaultValue={value}
        onChange={handleOnChange}
      />
    </div>
  );
}
