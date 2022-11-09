import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import LocaleContext from "../contexts/LocaleContext";

const NotFound = () => {
  const { locale } = useContext(LocaleContext);
  return (
    <div>
      <Link to="/" title="Kembali">
        <HiArrowLeft /> {locale === "id" ? "Kembali" : "Back"}
      </Link>
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default NotFound;
