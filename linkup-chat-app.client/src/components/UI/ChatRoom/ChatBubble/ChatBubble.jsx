import React, { useRef, useEffect } from "react";
import "./ChatBubble.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DOMPurify from "dompurify";

const ChatBubble = ({ userName, message, loggedInUsername }) => {
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
      className={`chatbubble ${loggedInUsername === userName ? "self" : ""}`}
    >
      <p id="username">{DOMPurify.sanitize(userName)}</p>
      <p id="message">{DOMPurify.sanitize(message)}</p>
    </div>
  );
};

export default ChatBubble;
