import React, { useEffect, useState } from "react";
import "./ChatRoomList.css";
import { useChat } from "../ChatProvider";

const ChatRoomList = () => {
  const { rooms, switchRoom, connection, getRooms, roomMessages } = useChat();
  const maxMessageLength = 15;

  useEffect(() => {
    if (connection) {
      getRooms();
    }
  }, [connection, roomMessages]);

  // Helper function to truncate messages
  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + "...";
    }
    return message;
  };

  return (
    <div className="chatroom-list">
      <div className="chatrooms">
        {rooms
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp
          .map((room, index) => (
            <div
              key={index}
              className="chatroom"
              onClick={() => switchRoom(room.roomName)}
            >
              <span className="room-img"></span>
              <div className="mid">
                <p className="room-name">{room.roomName}</p>
                <p className="latest-message">
                  {truncateMessage(room.latestMessage, maxMessageLength)}
                </p>
              </div>
              <p className="timestamp">
                {room.timestamp !== "0001-01-01T00:00:00"
                  ? new Date(room.timestamp).toLocaleTimeString().slice(0, 5)
                  : "00:00"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
