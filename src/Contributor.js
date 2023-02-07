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
    e.preventDefault();
    try {
      const config = {
        headers: authHeader(),
      };
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
        data.sortBy = data.sort; // this fixes error that makes compiler think sort is a function and can't be rendered
        setData(data);
      })
      .catch((err) => {
        navigate("/");
      });
  }, [navigate, path]);

  return (
    <div className="body">
      <div className="contributor-edit">
        <img
          className="profile-picture"
          alt={data.name}
          src={data.picture}
        ></img>
        <form className="contributor-form" onSubmit={handleSubmit}>
          <EditableTitle
            handleOnChange={handleInputChange}
            label="Name"
            text={data.name}
          />
          <EditableTitle
            handleOnChange={handleInputChange}
            label="Sort"
            text={data.sortBy}
          />
          <EditableTitle
            handleOnChange={handleInputChange}
            label="Country"
            text={data.country}
          />
          <EditableTitle
            handleOnChange={handleInputChange}
            label="Contact"
            text={data.contact}
          />
          <EditableTitle
            handleOnChange={handleInputChange}
            label="Donate"
            text={data.donate}
          />
          <div className="input-row">
            <label>Category:</label>
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
          <EditableTitle
            handleOnChange={handleInputChange}
            label="Path"
            text={data.path}
          />
          <div className="input-row">
            <label>Bio:</label>
            <textarea
              name="bio"
              onBlur={handleInputChange}
              onChange={handleInputChange}
              className="input-box input-contributor"
              defaultValue={data.bio}
            ></textarea>
          </div>
          <input type="submit" className="submit-button" value="Save"></input>
        </form>
      </div>
    </div>
  );
}

function EditableTitle({ text, label, handleOnChange }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleOnClick(e) {
    setIsEditing(!isEditing);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleOnClick();
    }
  }

  function handleOnChangeEdit(e) {
    setIsEditing(true);
    handleOnChange(e);
  }

  return (
    <div className="editable-row">
      <label>{`${label}:`}</label>
      {isEditing || text === "" ? (
        <input
          name={label.toLowerCase()}
          onChange={handleOnChangeEdit}
          defaultValue={text}
          onBlur={handleOnClick}
          onKeyDown={handleKeyDown}
          className="input-box input-contributor"
          type="text"
          autoFocus={text !== ""}
        />
      ) : (
        <button onClick={handleOnClick} className="editable-title">
          {text}
        </button>
      )}
    </div>
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
