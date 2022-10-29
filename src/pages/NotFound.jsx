import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <div>
      <Link to="/" title="Kembali">
        <HiArrowLeft /> Kembali
      </Link>
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default NotFound;
