import Button from "@mui/material/Button";
import EditableTitle from "./EditableTitle";
import { useState } from "react";
import axios from "axios";
import { authHeader } from "../../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Piece({
  piece = { title: "", description: "" },
  path,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState(piece);
  const [audioFile, setAudioFile] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);
  const isNewPiece = piece.title === "" && piece.description === "";

  function handleAudioChange(e) {
    setAudioFile(e.target.files[0]);
  }

  function handleScoreChange(e) {
    setScoreFile(e.target.files[0]);
  }

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let config = {
      headers: authHeader(),
    };
    config.headers["content-type"] = "multipart/form-data";

    const formData = new FormData();
    !isNewPiece && formData.append("id", data._id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    audioFile && formData.append("audio", audioFile);
    scoreFile && formData.append("score", scoreFile);

    const endpoint = isNewPiece
      ? `create-contribution/${path}`
      : "update-contribution";

    const promise = axios
      .post(`${process.env.REACT_APP_API_URL}api/${endpoint}`, formData, config)
      .then((response) => {
        isNewPiece &&
          setTimeout(() => {
            navigate(0);
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
            Select audio file
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
            Select score file
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
            {isNewPiece ? "Create piece" : "Update piece"}
          </Button>
        </div>
      </form>
    </div>
  );
}
