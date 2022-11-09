import React, { useEffect, useState, useContext } from "react";
import NotesList from "../components/notes/NotesList";
import SearchBar from "../components/layout/SearchBar";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";
import { PacmanLoader } from "react-spinners";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    // update the contacts state from network.js
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  async function onArchiveHandler(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      {loading ? (
        <div className="loading">
          <PacmanLoader color={"#FCE700"} loading={loading} />
        </div>
      ) : (
        <>
          <div className="nav-body">
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            <Link title="Add Note" to="/add" className="add">
              <MdOutlineAddCircle />
            </Link>
          </div>
          <div id="archive-notes">
            <h2>
              <u>{locale === "id" ? "Catatan Arsip" : "Archive Notes"}</u>
            </h2>
            {notes.length !== 0 ? <NotesList notes={filteredNotes} onDelete={onDeleteHandler} onActive={onArchiveHandler} /> : <h5 className="">No Notes Here....</h5>}
          </div>
        </>
      )}
    </section>
  );
}

export default ArchivePage;
