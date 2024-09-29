import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ userName, message }) => {
  return (
    <div className="chatbubble">
      <p id="username">{userName}:</p>
      <p id="message">{message}</p>
    </div>
  );
};

export default ChatBubble;
