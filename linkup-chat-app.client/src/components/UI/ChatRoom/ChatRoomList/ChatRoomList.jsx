import React, { useEffect, useState } from "react";
import "./ChatRoomList.css";
import { useChat } from "../ChatProvider";

const ChatRoomList = () => {
  const { rooms, joinRoom, connection, getRooms } = useChat();
  useEffect(() => {
    if (connection) {
      getRooms();
    }
  }, [connection]);

  return (
    <div className="chatroom-list">
      <div className="chatrooms">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="chatroom"
            //#TODO The joinRoom method should not be here
            onClick={() => joinRoom(room.name)}
          >
            <span className="room-img"></span>
            <div className="mid">
              <p className="room-name">{room.name}</p>
              <p className="latest-message">
                The latest message should be here
              </p>
            </div>
            <p className="timestamp">14:10</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
