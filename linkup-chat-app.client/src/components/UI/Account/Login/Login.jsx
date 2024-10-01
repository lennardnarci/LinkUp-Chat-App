import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);

  useGSAP(() => {
    gsap.from(".logo", { opacity: 0, duration: 1 });
  });

  //Change the stage to the next stage of signup
  const handleNext = () => {
    if (stage === 1) {
      // Animate username input out and password input in
      gsap.to(".username-input", {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          setStage(2);
          gsap.to(".username-input", {
            display: "none",
          });
          gsap.to(".password-input", {
            x: "0%",
            opacity: 1,
            display: "flex",
            duration: 0.5,
            ease: "power1.inOut",
          });
        },
      });
    } else {
      login();
    }
  };

  const login = async (event) => {
    // Stoppa vanlig form från att köras
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
    <form className="login-form">
      <div className="logo">LinkUp</div>
      {error && <div className="error">{error}</div>}
      <div className="inputs">
        <div className="username-input">
          <p className="text-field-header">Username</p>
          <input
            type="username"
            name="username"
            className="text-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-input slide">
          <p className="text-field-header">Password</p>
          <input
            type="password"
            name="password"
            className="text-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="buttons">
        <button type="button" className="btn-primary" onClick={handleNext}>
          {stage === 1 ? "Next" : "Login"}
        </button>
        <Link className="btn-secondary" to={"/signup"}>
          <button type="button" className="btn-secondary">
            SignUp
          </button>
        </Link>
      </div>
    </form>
  );
};

export default Login;
