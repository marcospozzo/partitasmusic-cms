import Button from "@mui/material/Button";
import EditableTitle from "./EditableTitle";
import { useState } from "react";
import axios from "axios";
import { authHeader } from "./auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Piece({
  piece = { title: "", description: "", isNewPiece: true },
  path,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState(piece);
  const [audioFile, setAudioFile] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);
    try {
      let config = {
        headers: authHeader(),
      };
      config.headers["content-type"] = "multipart/form-data";

      const formData = new FormData();
      !data.isNewPiece && formData.append("id", data._id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      audioFile && formData.append("audio", audioFile);
      scoreFile && formData.append("score", scoreFile);

      const endpoint = data.isNewPiece
        ? `create-contribution/${path}`
        : "update-contribution";

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/${endpoint}`,
        formData,
        config
      );

      setUploading(false);

      response.data.success
        ? toast.success(response.data.success)
        : toast.error("Couldn't save changes");

      data.isNewPiece &&
        setTimeout(() => {
          navigate(0);
        }, 1000);
    } catch (error) {
      setUploading(false);
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <form className="piece" onSubmit={handleSubmit}>
        <EditableTitle
          className="input-piece"
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
            className={audioFile && "Button file-selected"}
            style={{ marginBottom: "1em", width: "30%" }}
            component="label"
          >
            {data.isNewPiece ? "Select audio file" : "Update audio file"}
            <input
              hidden
              onChange={handleAudioChange}
              accept="audio/mp3"
              type="file"
            />
          </Button>
          <Button
            className={scoreFile && "Button file-selected"}
            style={{ marginBottom: "1em", width: "30%" }}
            component="label"
          >
            {data.isNewPiece ? "Select score file" : "Update score file"}
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
            {uploading && data.isNewPiece
              ? "Uploading..."
              : data.isNewPiece
              ? "Create piece"
              : "Save piece"}
          </Button>
        </div>
      </form>
    </div>
  );
}
