import React from "react";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

function RegisterPage() {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Validasi Konfirmasi Password
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
      <h2>Register new account ...</h2>
      <form onSubmit={handleSubmit} className="register-input">
        <input type="text" placeholder="Nama" value={name} onChange={onNameChange} className="register-name" required />
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="register-email" />
        <input type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={onPasswordChange} className="register-password" required />
        <input type="password" placeholder="Confirm Password" autoComplete="current-password" value={confirmPassword} onChange={onConfirmPasswordChange} className="register-password" required />
        <button>Register</button>
      </form>
      <p className="login">
        Already have account? <Link to="/"> Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
