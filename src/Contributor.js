import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";
import axios from "axios";
import { authHeader } from "./auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contributor() {
  const navigate = useNavigate();
  const { path } = useParams();
  const [data, setData] = useState([]);

  function handleInputChange(e) {
    // e.target.value === "" && (e.target.value = data[e.target.name]); // does not quite work, but almost
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    const config = {
      headers: authHeader(),
    };
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/update-contributor`,
        data,
        config
      );
      response.data === "OK"
        ? toast.success("Changes saved")
        : toast.error("Couldn't save changes");
    } catch (error) {
      toast.error("Couldn't save changes");
    }
  }

  useEffect(() => {
    fetchApi(`${process.env.REACT_APP_API_URL}api/get-contributor/${path}`)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        navigate("/");
      });
  }, [navigate, path]);

  return (
    <>
      <form onSubmit={handleSubmit} className="contributor-edit">
        <EditableTitle name={data.name} handleOnChange={handleInputChange} />
        <img
          className="profile-picture"
          alt={data.name}
          src={data.picture}
        ></img>
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
            onBlur={handleInputChange}
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
    </>
  );
}

function EditableTitle({ name, handleOnChange }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleOnClick(e) {
    setIsEditing(!isEditing);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleOnClick();
    }
  }

  return (
    <>
      {isEditing ? (
        <input
          name="name"
          onChange={handleOnChange}
          defaultValue={name}
          onBlur={handleOnClick}
          onKeyDown={handleKeyDown}
          className="input-box input-contributor"
          type="text"
          autoFocus
          // ref={(input) => input && input.focus()} // fix for autoFocus not working because of render times
        />
      ) : (
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
        onBlur={handleOnChange}
        name={label.toLowerCase()}
        type="text"
        className="input-box input-contributor"
        defaultValue={value}
        onChange={handleOnChange}
      />
    </div>
  );
}
