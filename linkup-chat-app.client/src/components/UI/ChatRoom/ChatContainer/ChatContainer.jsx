import React, { useEffect } from "react";
import "./ChatContainer.css";
import { useChat } from "../ChatProvider";
import ChatBubble from "../ChatBubble/ChatBubble";

const ChatContainer = ({ loggedInUsername }) => {
  const { roomMessages, currentRoom } = useChat();
  useEffect(() => {
    console.log(roomMessages);
  }, []);

  return (
    <div className="chat-container">
      <div className="messages">
        {currentRoom && roomMessages[currentRoom] ? (
          roomMessages[currentRoom].map((msg, index) => (
            <ChatBubble
              key={index}
              userName={msg.user}
              message={msg.message}
              timestamp={msg.timestamp}
              loggedInUsername={loggedInUsername}
            />
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
