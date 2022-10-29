import React from "react";
import PropTypes from "prop-types";
import NotesItem from "./NotesItem";

function NotesList({ onDelete, notes, onActive }) {
  return (
    <section className="note-list">
      {notes.map((note) => (
        <NotesItem key={note.id} id={note.id} onDelete={onDelete} buttonId={onActive} {...note} />
      ))}
    </section>
  );
}

NotesList.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default NotesList;
