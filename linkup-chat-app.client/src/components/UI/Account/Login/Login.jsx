import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // Stoppa vanlig form från att köras
    console.log("signing in", { username, password });
    // Auth kod som kommunicerar med servern
    try {
      const response = await fetch("https://localhost:7261/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const token = data.token;

      // Sparar JWT TOken till localstorage
      localStorage.setItem("jwtToken", token);

      // Redirectar
      navigate("/chat");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Error logging in: ", err);
    }
  };

  return (
    <form onSubmit={login} className="login-form">
      <div className="logo">LinkUp</div>
      {error && <div className="error">{error}</div>}
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
