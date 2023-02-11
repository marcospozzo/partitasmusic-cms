import Button from "@mui/material/Button";
import EditableTitle from "./EditableTitle";

export default function Piece({ piece, handleOnChange }) {
  return (
    <div className="piece">
      <EditableTitle
        text={piece.title}
        label="Title"
        fieldName="title"
        handleOnChange={handleOnChange}
      />
      <div className="input-row">
        <label>Description:</label>
        <textarea
          name="description"
          onChange={handleOnChange}
          className="input-box input-contributor textarea-piece"
          defaultValue={piece.description}
        ></textarea>
      </div>
      <div className="contributor-button-row">
        <Button style={{ marginBottom: "1em", width: "30%" }} component="label">
          Update audio file
          <input hidden accept="audio/mp3" type="file" />
        </Button>
        <Button style={{ marginBottom: "1em", width: "30%" }} component="label">
          Update score file
          <input hidden accept="application/pdf" type="file" />
        </Button>
        <Button
          type="submit"
          style={{ marginBottom: "1em", width: "30%" }}
          variant="contained"
          component="label"
        >
          Save Piece
        </Button>
      </div>
    </div>
  );
}
