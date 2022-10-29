import React from "react";
import { addNote } from "../utils/api";
import NotesInput from "../components/notes/NotesInput";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();

  async function onAddNotesHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <section>
      <NotesInput addNotes={onAddNotesHandler} />
    </section>
  );
}

export default AddPage;
