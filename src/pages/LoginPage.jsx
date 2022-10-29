import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import AuthContext from "../contexts/AuthContext";
import { login, getUserLogged, putAccessToken } from "../utils/api";

function LoginPage() {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password }).then((result) => {
      if (!result.error) {
        putAccessToken(result.data.accessToken);
        getUserLogged()
          .then((result) => {
            if (!result.error) {
              setAuth(result.data);
            } else {
              setAuth(null);
            }
            navigate("/");
          })
          .catch(() => {
            alert("eror");
          });
      }
    });
  };

  // async function onLogin({ email, password }) {
  //   const { error, data } = await login({ email, password });

  //   if (!error) {
  //     loginSuccess(data);
  //   }
  // }

  return (
    <section className="login-page">
      <h2> Sign into your account ...</h2>
      <form onSubmit={onSubmitHandler} className="login-input">
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="login-email" />
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
        <button type="submit">Login</button>
      </form>
      <p className="register">
        Don't have account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

// LoginPage.propTypes = {
//   loginSuccess: PropTypes.func.isRequired,
// };

export default LoginPage;
