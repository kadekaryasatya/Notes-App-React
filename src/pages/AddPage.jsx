import React, { useContext } from "react";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function AddPage() {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const limit = 50;

  const { locale } = useContext(LocaleContext);
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
      <h2>{locale === "id" ? "Tambah Catatan" : "Add Note"}</h2>
      <form className="note-input" onSubmit={handleSubmit}>
        <input className="note-input__title" type="text" placeholder={locale === "id" ? "Masukkan judul ..." : "Add title ..."} value={title} id="title" onChange={onTitleChange} required />
        <p className="note-input__title__char-limit">
          {limit - title.length} {locale === "id" ? "sisa karakter" : "remaining character"}
        </p>
        <textarea placeholder={locale === "id" ? "Isi catatan ..." : "Take a note ..."} value={body} onChange={onBodyChange} required />
        <button type="submit">{locale === "id" ? "Tambah" : "Add"}</button>
      </form>
    </div>
  );
}

export default AddPage;
