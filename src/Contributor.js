import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";
import axios from "axios";
import { authHeader } from "./auth";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import EditableTitle from "./EditableTitle";

export default function Contributor({ path = "" }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newPicture, setNewPicture] = useState(null);
  const isNewContributor = path === "";

  function handleImageChange(e) {
    const newPicture = e.target.files[0];
    if (newPicture) {
      // display the selected image instead of the previous one
      const objectUrl = URL.createObjectURL(newPicture);
      document.getElementById("profile-picture").src = objectUrl;

      setNewPicture(newPicture);
    }
  }

  function handleOnCancel(e) {
    e.preventDefault();
    isNewContributor ? navigate("/") : navigate(0);
  }

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let config = {
      headers: authHeader(),
    };
    config.headers["content-type"] = "multipart/form-data";

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sortBy", data.sortBy);
    formData.append("country", data.country);
    formData.append("contact", data.contact || "");
    formData.append("donate", data.donate || "");
    formData.append("category", data.category);
    formData.append("bio", data.bio || "");

    const path =
      isNewContributor && data.name
        ? data.name
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase()
        : data.path;
    formData.append("path", path);
    formData.append("type", data.type);
    newPicture && formData.append("image", newPicture);

    const endpoint = isNewContributor
      ? "create-contributor"
      : "update-contributor";

    const promise = await axios
      .post(`${process.env.REACT_APP_API_URL}api/${endpoint}`, formData, config)
      .then((response) => {
        isNewContributor &&
          setTimeout(() => {
            navigate(`/contributors/${path}`);
          }, 1000);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

    toast.promise(promise, {
      pending: "Loading...",
      success: {
        render({ data }) {
          return data.success;
        },
      },
      error: {
        render({ data }) {
          return data.response.data.error;
        },
      },
    });
  }

  useEffect(() => {
    !isNewContributor && // if is not a new contributor, fetch data
      fetchApi(`${process.env.REACT_APP_API_URL}api/get-contributor/${path}`)
        .then((data) => {
          data.sortBy = data.sort; // this fixes error that makes compiler think sort is a function and can't be rendered
          setData(data);
        })
        .catch((err) => {
          navigate("/");
        });
  }, [isNewContributor, navigate, path]);

  return (
    <div
      className={
        isNewContributor
          ? "contributor-edit new-contributor-edit"
          : "contributor-edit"
      }
    >
      <form className="contributor-form" onSubmit={handleSubmit}>
        {!isNewContributor && (
          <a
            href={`${process.env.REACT_APP_API_URL}music-catalog/${path}`}
            className="links unselected"
            target="_blank"
            rel="noreferrer"
          >
            Open in Partitas Music
          </a>
        )}
        <img
          id="profile-picture"
          className="profile-picture"
          alt={data.name}
          src={
            isNewContributor
              ? "/Profile_avatar_placeholder_large.png"
              : data.picture
          }
        ></img>
        <Button
          style={{ width: "40%", alignSelf: "center", marginBottom: "1em" }}
          variant="contained"
          component="label"
        >
          Select picture
          <input
            name="picture"
            onChange={handleImageChange}
            hidden
            accept="image/*"
            type="file"
          />
        </Button>
        <EditableTitle
          handleOnChange={handleInputChange}
          label="Name"
          fieldName="name"
          text={data.name}
        />
        <EditableTitle
          handleOnChange={handleInputChange}
          label="Sort by"
          fieldName="sortBy"
          text={data.sortBy}
        />
        <EditableTitle
          handleOnChange={handleInputChange}
          label="Country"
          fieldName="country"
          text={data.country}
        />
        <EditableTitle
          handleOnChange={handleInputChange}
          label="Contact"
          fieldName="contact"
          text={data.contact}
        />
        <EditableTitle
          handleOnChange={handleInputChange}
          label="Donate"
          fieldName="donate"
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
        <div className="input-row">
          <label>Type:</label>
          <select
            name="type"
            onChange={handleInputChange}
            className="input-box input-contributor"
            value={data.type}
            defaultValue=""
          >
            <option hidden disabled value=""></option>
            <option value="not-featured">not-featured</option>
            <option value="featured">featured</option>
          </select>
        </div>
        <div className="input-row">
          <label>Bio:</label>
          <textarea
            name="bio"
            onChange={handleInputChange}
            className="input-box input-contributor"
            defaultValue={data.bio}
          ></textarea>
        </div>
        <div className="contributor-button-row">
          <Button
            style={{ width: "60%" }}
            className="submit-button"
            type="submit"
            variant="contained"
          >
            {isNewContributor ? "Create contributor" : "Save changes"}
          </Button>
          <Button
            style={{ width: "30%" }}
            onClick={handleOnCancel}
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
