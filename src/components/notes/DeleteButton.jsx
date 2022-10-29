import React from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

function DeleteButton({ id, onDelete }) {
  return (
    <button className="note-item__delete-button" title="Delete" onClick={() => onDelete(id)}>
      <AiFillDelete />
    </button>
  );
}

DeleteButton.propTypes = {
  // id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default DeleteButton;
