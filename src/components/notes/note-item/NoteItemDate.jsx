import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../../utils/data";

function NoteItemDate({ date }) {
  return <p className="note-item__date">{showFormattedDate(date)}</p>;
}

NoteItemDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default NoteItemDate;
