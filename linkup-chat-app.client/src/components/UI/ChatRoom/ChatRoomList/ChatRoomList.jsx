import React, { useRef } from "react";
import "./ChatRoomList.css";
import { useChat } from "../ChatProvider";

const ChatRoomList = () => {
  const { joinRoom } = useChat();

  const rooms = [
    {
      name: "Wag12",
      latestMessage: "Have you guys seen the latest v...",
      timestamp: "14:10",
    },
    {
      name: "Public Room",
      latestMessage: "Does anyone know what to do...",
      timestamp: "14:03",
    },
  ];

  return (
    <div className="chatroom-list">
      <div className="chatrooms">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="chatroom"
            onClick={() => joinRoom(room.name)}
          >
            <span className="room-img"></span>
            <div className="mid">
              <h3 className="room-name">{room.name}</h3>
              <p className="latest-message">{room.latestMessage}</p>
            </div>
            <p className="timestamp">{room.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
