import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import { IoMdArchive } from "react-icons/io";
import NoteItemTitle from "./note-item/NoteItemTitle";
import NoteItemBody from "./note-item/NoteItemBody";
import NoteItemDate from "./note-item/NoteItemDate";

function NotesItem({ id, archived, onDelete, buttonId, title, body, createdAt }) {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <NoteItemTitle key={id} id={id} title={title} />
        <NoteItemDate date={createdAt} />
        <NoteItemBody body={body} />
      </div>
      <div className="note-item__action">
        <DeleteButton id={id} onDelete={onDelete} />
        <button title={archived ? "Active" : "Archive"} onClick={() => buttonId(id)} className="note-item__archive-button">
          <IoMdArchive />
        </button>
      </div>
    </div>
  );
}

NotesItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired,
  buttonId: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default NotesItem;
