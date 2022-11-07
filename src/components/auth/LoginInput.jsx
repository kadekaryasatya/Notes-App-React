import React from "react";
import PropTypes from "prop-types";
// import useInput from "../../hooks/useInput";
// import { login } from "../utils/api";

// function LoginInput() {
//   const [email, onEmailChange] = useInput("");
//   const [password, onPasswordChange] = useInput("");

//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     login({ email, password });
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="login-input">
//       <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="login-email" />
//       <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginInput;

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler} className="login-input">
        <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChangeHandler} className="login-email" />
        <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChangeHandler} />
        <button>Login</button>
      </form>
    );
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
