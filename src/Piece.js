import Button from "@mui/material/Button";
import EditableTitle from "./EditableTitle";
import { useState } from "react";
import axios from "axios";
import { authHeader } from "./auth";
import { toast } from "react-toastify";

export default function Piece({ piece }) {
  const [data, setData] = useState(piece);
  const [audioFile, setAudioFile] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);

  function handleAudioChange(e) {
    setAudioFile(e.target.files[0]);
  }

  function handleScoreChange(e) {
    setScoreFile(e.target.files[0]);
  }

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let config = {
        headers: authHeader(),
      };
      config.headers["content-type"] = "multipart/form-data";

      const formData = new FormData();
      formData.append("id", data._id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      audioFile && formData.append("audio", audioFile);
      audioFile && formData.append("score", scoreFile);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/update-contribution`,
        formData,
        config
      );

      // navigate(newUrl, { replace: true });

      response.data === "OK"
        ? toast.success("Changes saved")
        : toast.error("Couldn't save changes");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save changes");
    }
  };

  return (
    <div>
      <form className="piece" onSubmit={handleSubmit}>
        <EditableTitle
          text={data.title}
          label="Title"
          fieldName="title"
          handleOnChange={handleInputChange}
        />
        <div className="input-row">
          <label>Description:</label>
          <textarea
            name="description"
            onChange={handleInputChange}
            className="input-box input-contributor textarea-piece"
            defaultValue={data.description}
          ></textarea>
        </div>
        <div className="contributor-button-row">
          <Button
            style={{ marginBottom: "1em", width: "30%" }}
            component="label"
          >
            Update audio file
            <input
              hidden
              onChange={handleAudioChange}
              accept="audio/mp3"
              type="file"
            />
          </Button>
          <Button
            style={{ marginBottom: "1em", width: "30%" }}
            component="label"
          >
            Update score file
            <input
              hidden
              onChange={handleScoreChange}
              accept="application/pdf"
              type="file"
            />
          </Button>
          <Button
            type="submit"
            style={{ marginBottom: "1em", width: "30%" }}
            variant="contained"
          >
            Save Piece
          </Button>
        </div>
      </form>
    </div>
  );
}
