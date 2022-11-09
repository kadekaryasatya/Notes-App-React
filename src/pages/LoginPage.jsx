import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { login } from "../utils/api";

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const { locale } = useContext(LocaleContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (!res.error) {
      loginSuccess(res.data);
    }
  };

  return (
    <section className="login-page">
      <h2>{locale === "id" ? "Masuk ke Akun Anda ..." : "Sign into your account ..."}</h2>
      <form onSubmit={handleSubmit} className="login-input">
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="login-email" />
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
        <button>{locale === "id" ? "Masuk" : "Login"}</button>
      </form>
      <p className="register">
        {locale === "id" ? "Tidak punya akun? " : "Don't have account? "}
        <Link to="/register">{locale === "id" ? "Daftar" : "Register"}</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func,
};

export default LoginPage;
