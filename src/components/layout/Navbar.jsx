import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdLanguage, MdStickyNote2 } from "react-icons/md";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../../contexts/LocaleContext";

function Navbar({ logout, name }) {
  const { pathname } = useLocation();
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <div className="topnav">
            <ul>
              <li>
                <Link to="/" className="active">
                  <MdStickyNote2 /> Notion
                </Link>
                {pathname !== "/archive" ? (
                  <Link to="/archive" className="archive" title="Archive Notes">
                    <u>{locale === "id" ? "Catatan Arsip" : "Archive Notes"}</u>
                  </Link>
                ) : (
                  <Link to="." className="archive" title="Active Notes">
                    <u>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</u>
                  </Link>
                )}
                <a href="/" className="logout" onClick={logout} title="logout">
                  {name} <FiLogOut />
                </a>

                <button className="language" onClick={toggleLocale}>
                  <MdLanguage color="white" /> {locale === "id" ? "eng" : "id"}
                </button>
              </li>
            </ul>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
