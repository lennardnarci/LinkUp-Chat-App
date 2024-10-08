import React, { useState } from "react";
import "./MessageField.css";
import { useChat } from "../ChatProvider";

const MessageField = ({ roomName }) => {
  const [message, setMessage] = useState("");
  const { currentRoom, sendMessage } = useChat();

  const handleSubmit = () => {
    if (message == null || message == "") return;
    sendMessage(roomName, message);
    setMessage("");
  };

  return (
    <>
      {currentRoom && (
        <div className="message-container">
          <input
            type="text"
            name="message"
            id="message-field"
            placeholder="Type something"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <button type="submit" id="submit-button" onClick={handleSubmit}>
            <p>Send</p>
          </button>
        </div>
      )}
    </>
  );
};

export default MessageField;
