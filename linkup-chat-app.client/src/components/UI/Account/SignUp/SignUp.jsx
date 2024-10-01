import React, { useEffect, useState } from "react";
import "./SignUp.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SignUp = () => {
  const [dots, setDots] = useState(["filled", "filled", "filled"]);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Change the stage to the next stage of signup
  const handleNext = () => {
    if (stage === 1) {
      // Animate username input out and password input in
      gsap.to(".email-input", {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          setStage(2);
          gsap.to(".email-input", {
            display: "none",
          });
          gsap.to(".username-input", {
            x: "0%",
            opacity: 1,
            display: "flex",
            duration: 0.5,
            ease: "power1.inOut",
          });
          gsap.to(".btn-back", {
            opacity: 1,
          });
        },
      });
    } else if (stage === 2) {
      gsap.to(".username-input", {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          setStage(3);
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
      //Sign up functionality #TODO
    }
  };

  const handleBack = () => {
    if (stage === 3) {
      // Animate username input out and password input in
      gsap.to(".password-input", {
        x: "0%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          setStage(2);
          gsap.to(".password-input", {
            display: "none",
          });
          gsap.to(".username-input", {
            x: "0%",
            opacity: 1,
            display: "flex",
            duration: 0.5,
            ease: "power1.inOut",
          });
        },
      });
    } else if (stage === 2) {
      gsap.to(".username-input", {
        x: "0%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          setStage(1);
          gsap.to(".username-input", {
            display: "none",
          });
          gsap.to(".email-input", {
            x: "0%",
            opacity: 1,
            display: "flex",
            duration: 0.5,
            ease: "power1.inOut",
          });
          gsap.to(".btn-back", {
            opacity: 0,
          });
        },
      });
    }
  };

  //use GSAP to animate progress dots
  useGSAP(() => {
    gsap.from(".dot", { y: -40, opacity: 0, stagger: 0.1 });
    gsap.from(".inner-dot-1", { width: 0 });
    gsap.from(".logo", { opacity: 0, duration: 1 });
  });

  useEffect(() => {
    setDots(dots.map((_, i) => (i < stage ? "filled" : "")));
    if (stage > 1) {
      gsap.from(`.inner-dot-${stage}`, { width: 0 });
    }
  }, [stage]);

  return (
    <div className="signup-form">
      <span className="dots">
        {dots.map((dot, i) => (
          <span className="dot" key={i}>
            <span
              className={`inner-dot-${(i + 1).toString()} ${dot.toString()}`}
            />
          </span>
        ))}
      </span>
      <div className="logo">LinkUp</div>
      <div className="inputs">
        <div className="email-input">
          <p className="text-field-header">Enter your email:</p>
          <input
            type="email"
            name="email"
            className="text-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="username-input slide">
          <p className="text-field-header">Enter your username:</p>
          <input
            type="username"
            name="username"
            className="text-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-input slide">
          <p className="text-field-header">Enter your password:</p>
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
        <button
          type="button"
          className="next-btn btn-primary"
          onClick={handleNext}
        >
          {stage === 3 ? "Sign Up" : "Next"}
        </button>
        <button
          type="button"
          className={`btn-secondary btn-back ${stage === 1 ? "btn-hide" : ""}`}
          onClick={handleBack}
          disabled={stage === 1}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SignUp;
