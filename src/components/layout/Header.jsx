import React from "react";
import { MdStickyNote2 } from "react-icons/md";

const Header = () => {
  return (
    <header className="note-app__header">
      <h1>
        <MdStickyNote2 /> Notion
      </h1>
    </header>
  );
};

export default Header;
