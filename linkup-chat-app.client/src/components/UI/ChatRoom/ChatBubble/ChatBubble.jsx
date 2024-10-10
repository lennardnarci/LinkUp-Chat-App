import React, { useRef, useEffect } from "react";
import "./ChatBubble.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DOMPurify from "dompurify";

const ChatBubble = ({ userName, message, timestamp, loggedInUsername }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      gsap.fromTo(
        bubbleRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: -10,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  return (
    <div
      ref={bubbleRef}
      className={`chatbubble ${
        loggedInUsername.toLowerCase() === userName.toLowerCase() ? "self" : ""
      }`}
    >
      <div className="chatbubble-left">
        <p id="username">{DOMPurify.sanitize(userName)}</p>
        <p id="message">{DOMPurify.sanitize(message)}</p>
      </div>
      <p id="timestamp">
        {timestamp !== "0001-01-01T00:00:00"
          ? new Date(timestamp).toLocaleTimeString().slice(0, 5)
          : "00:00"}
      </p>
    </div>
  );
};

export default ChatBubble;
