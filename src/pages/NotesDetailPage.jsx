import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { getNotes } from "../utils/api";
import { showFormattedDate } from "../utils/data";
import NotFound from "./NotFound";
import LocaleContext from "../contexts/LocaleContext";

function NotesDetailPage() {
  const [note, setNote] = useState([]);
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getNotes(id).then(({ data }) => {
      setNote(data);
    });
  }, [id]);

  return (
    <section className="detail-page">
      {"id" in note ? (
        <>
          <Link to="/" title="Back">
            <HiArrowLeft /> {locale === "id" ? "Kembali" : "Back"}
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
