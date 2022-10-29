import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { showFormattedDate, getNote } from "../utils/data";
import NotFound from "./NotFound";

function NotesDetailPage() {
  const [note, setNote] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const showNote = getNote(id);
    if (showNote) {
      setNote(showNote);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="detail-page">
      {"id" in note ? (
        <>
          <Link to="/" title="Kembali">
            <HiArrowLeft /> Kembali
          </Link>
          <h3 className="detail-page__title">{note.title}</h3>
          <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
          <div className="detail-page__body">{note.body}</div>
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </section>
  );
}

export default NotesDetailPage;
