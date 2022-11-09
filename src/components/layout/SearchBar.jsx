import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
  const { locale } = useContext(LocaleContext);

  return <input className="search-bar" type="text" placeholder={locale === "id" ? "Cari catatan ..." : "Search notes ..."} value={keyword} onChange={(event) => keywordChange(event.target.value)} />;
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
