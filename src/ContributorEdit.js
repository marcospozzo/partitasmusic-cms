import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./fetchApi.js";
import axios from "axios";
import { authHeader } from "./auth";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import EditableTitle from "./EditableTitle";

export default function ContributorEdit({ path }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newPicture, setNewPicture] = useState(null);

  function handleImageChange(e) {
    const newPicture = e.target.files[0];
    if (newPicture) {
      // display the about-to-upload image instead of the previous one
      const objectUrl = URL.createObjectURL(newPicture);
      document.getElementById("profile-picture").src = objectUrl;

      setNewPicture(newPicture);
    }
  }

  function handleOnCancel(e) {
    e.preventDefault();
    navigate(0);
  }

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let config = {
        headers: authHeader(),
      };
      config.headers["content-type"] = "multipart/form-data";

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("sortBy", data.sortBy);
      formData.append("country", data.country);
      formData.append("contact", data.contact);
      formData.append("donate", data.donate);
      formData.append("category", data.category);
      formData.append("path", data.path);
      formData.append("bio", data.bio);
      if (newPicture) {
        formData.append("image", newPicture);
        formData.append("imageName", newPicture.name);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/update-contributor/${path}`,
        formData,
        config
      );

      // change current url to the one set on path field
      const currentUrl = window.location.pathname;
      const parts = currentUrl.split("/");
      parts[parts.length - 1] = data.path;
      const newUrl = parts.join("/");
      navigate(newUrl, { replace: true });

      response.data === "OK"
        ? toast.success("Changes saved")
        : toast.error("Couldn't save changes");
    } catch (error) {
      console.error(error);
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
    <div className="contributor-edit">
      <form className="contributor-form" onSubmit={handleSubmit}>
        <img
          id="profile-picture"
          className="profile-picture"
          alt={data.name}
          src={data.picture}
        ></img>
        <Button
          style={{ width: "45%", alignSelf: "center", marginBottom: "1em" }}
          variant="contained"
          component="label"
        >
          Select picture
          <input
            name="picture"
            onChange={handleImageChange}
            hidden
            accept="image/*"
            multiple
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
        <EditableTitle
          handleOnChange={handleInputChange}
          label="Path"
          fieldName="path"
          text={data.path}
        />
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
            Save changes
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
