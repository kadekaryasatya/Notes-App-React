import React, { useContext } from "react";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const { locale } = useContext(LocaleContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Validation Confirm Password
     */
    if (password !== confirmPassword) {
      alert("The password confirmation does not match");
      navigate("/register");
    } else {
      /**
       * register
       */
      register({ name, email, password }).then((res) => {
        if (!res.error) {
          alert("Registration succesfuly");
          navigate("/");
        }
      });
    }
  };

  return (
    <section className="register-page">
      <h2>{locale === "id" ? "Daftar akun baru ..." : "Register new account ..."}</h2>
      <form onSubmit={handleSubmit} className="register-input">
        <input type="text" placeholder={locale === "id" ? "Nama" : "Name"} value={name} onChange={onNameChange} className="register-name" required />
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="register-email" />
        <input type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={onPasswordChange} className="register-password" required />
        <input type="password" placeholder="Confirm Password" autoComplete="current-password" value={confirmPassword} onChange={onConfirmPasswordChange} className="register-password" required />
        <button>{locale === "id" ? "Daftar" : "Register"}</button>
      </form>
      <p className="login">
        {locale === "id" ? "Sudah punya akun? " : "Aleready have account? "} <Link to="/"> Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
