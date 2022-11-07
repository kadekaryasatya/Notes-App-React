import React from "react";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

function AddPage1() {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const limit = 50;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    /**
     * Addnote
     */
    addNote({ title, body }).then((res) => {
      if (!res.error) {
        navigate("/");
      }
    });
  };

  return (
    <div className="form-input" id="form-input">
      <h2>Add Note</h2>
      <form className="note-input" onSubmit={handleSubmit}>
        <input className="note-input__title" type="text" placeholder="Add Title ..." value={title} id="title" onChange={onTitleChange} required />
        <p className="note-input__title__char-limit">{limit - title.length} remaining character</p>
        <textarea placeholder="Take a Note ...." value={body} onChange={onBodyChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddPage1;
