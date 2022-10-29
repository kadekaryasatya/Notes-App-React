import React from "react";
import RegisterInput from "../components/auth/RegisterInput";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>Register new account ...</h2>
      <RegisterInput register={onRegisterHandler} />
      <p className="login">
        Already have account? <Link to="/"> Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
