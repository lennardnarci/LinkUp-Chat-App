import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(event) {
    event.preventDefault(); // Stoppa vanlig form från att köras
    console.log("signed in", { username, password });
    // Lägg till auth kod här
  }

  return (
    <form onSubmit={login} className="login-form">
      <div className="logo">LinkUp</div>
      <div className="username-input">
        <p id="login-username">Username</p>
        <input
          type="username"
          name="username"
          className="text-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="password-input">
        <p id="login-password">Password</p>
        <input
          type="password"
          name="password"
          className="text-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button type="submit" className="login-btn">
          Login
        </button>
        <Link className="signup-btn" to={"/signup"}>
          <button type="button" className="signup-btn">
            SignUp
          </button>
        </Link>
      </div>
    </form>
  );
};

export default Login;
