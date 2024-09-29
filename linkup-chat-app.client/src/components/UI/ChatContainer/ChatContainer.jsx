import React, { useEffect } from "react";
import "./ChatContainer.css";
import { useChat } from "../../ChatProvider";

const ChatContainer = ({ roomName }) => {
  const { messages, joinRoom } = useChat();

  useEffect(() => {
    joinRoom({ roomName });
  }, []);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.user}</strong>: {msg.message}
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
