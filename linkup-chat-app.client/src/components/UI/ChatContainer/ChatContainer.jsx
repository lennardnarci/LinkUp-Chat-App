import React from "react";
import "./ChatContainer.css";
import { useChat } from "../../ChatProvider";
import ChatBubble from "../ChatBubble/ChatBubble";

const ChatContainer = () => {
  const { messages } = useChat();

  return (
    <div className="chat-container">
      <div className="messages">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <ChatBubble key={index} userName={msg.user} message={msg.message} />
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
