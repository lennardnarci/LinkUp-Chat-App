import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ userName, message }) => {
  return (
    <div>
      <strong>{userName}</strong>:{message}
    </div>
  );
};

export default ChatBubble;
