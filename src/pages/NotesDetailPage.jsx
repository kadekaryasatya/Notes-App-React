import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { getNotes } from "../utils/api";
import { showFormattedDate } from "../utils/data";
import NotFound from "./NotFound";
import LocaleContext from "../contexts/LocaleContext";
import { ClimbingBoxLoader } from "react-spinners";

function NotesDetailPage() {
  const [note, setNote] = useState([]);
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes(id).then(({ data }) => {
      setNote(data);
    });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (!note) {
    return <NotFound />;
  }
  return (
    <section className="detail-page">
      {loading ? (
        <div className="loading">
          <ClimbingBoxLoader color={"#FCE700"} loading={loading} />
        </div>
      ) : (
        <>
          <Link to="/" title="Back">
            <HiArrowLeft /> {locale === "id" ? "Kembali" : "Back"}
          </Link>
          <h3 className="detail-page__title">{note.title}</h3>
          <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
          <div className="detail-page__body">{note.body}</div>
        </>
      )}
    </section>
  );
}

export default NotesDetailPage;
