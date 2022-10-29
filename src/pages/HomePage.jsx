import React, { useEffect, useState, useContext } from "react";
import NotesList from "../components/notes/NotesList";
import SearchBar from "../components/layout/SearchBar";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import PropTypes from "prop-types";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    // update the note state from api.js
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    const { data } = await getActiveNotes();
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
      <div className="nav-body">
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <Link title="Add Note" to="/add" className="add">
          <MdOutlineAddCircle />
        </Link>
      </div>
      <div id="active-notes">
        <h2>
          <u> {locale === "id" ? "Catatan Aktif" : "Active Notes"}</u>
        </h2>
        {notes.length !== 0 ? <NotesList notes={filteredNotes} onDelete={onDeleteHandler} onActive={onArchiveHandler} /> : <h5 className="">No Notes Here....</h5>}
      </div>
    </section>
  );
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  // keywordChange: PropTypes.func.isRequired,
};

export default HomePage;

// function HomePageWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keyword = searchParams.get("keyword");
//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
// }

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: [],
//       keyword: props.defaultKeyword || "",
//     };

//     this.onArchiveHandler = this.onArchiveHandler.bind(this);
//     this.onActiveHandler = this.onActiveHandler.bind(this);
//     this.onDeleteHandler = this.onDeleteHandler.bind(this);
//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   async componentDidMount() {
//     const { data } = await getActiveNotes();

//     this.setState(() => {
//       return {
//         notes: data,
//       };
//     });
//   }

//   async onDeleteHandler(id) {
//     await deleteNote(id);

//     // update the contact state from data.js
//     const { data } = await getActiveNotes();
//     this.setState(() => {
//       return {
//         notes: data,
//       };
//     });
//   }

//   onActiveHandler(id) {
//     const notesActive = this.state.notes.filter((notes) => notes.id === id);
//     const activeNotes = (notesActive[0].archived = true);
//     this.setState({ activeNotes });
//   }

//   onArchiveHandler(id) {
//     const notesArchive = this.state.notes.filter((notes) => notes.id === id);
//     const undoNotes = (notesArchive[0].archived = false);
//     this.setState({ undoNotes });
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });
//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const searchNotes = this.state.notes.filter((notes) => {
//       return notes.title.toLowerCase().includes(this.state.keyword.toLowerCase());
//     });
//     const activeNotes = searchNotes.filter((notes) => notes.archived === false);
//     const archiveNotes = searchNotes.filter((notes) => notes.archived === true);

//     return (
//       <section>
//         <div className="nav-body">
//           <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />

//           <Link title="Add Note" to="/add" className="add">
//             <MdOutlineAddCircle />
//           </Link>
//         </div>
//         <NotesAppBody onDelete={this.onDeleteHandler} activeNotes={activeNotes} archiveNotes={archiveNotes} onActive={this.onActiveHandler} onArchive={this.onArchiveHandler} />
//       </section>
//     );
//   }
// }

// HomePage.propTypes = {
//   defaultKeyword: PropTypes.string,
//   keywordChange: PropTypes.func.isRequired,
// };

// export default HomePageWrapper;
