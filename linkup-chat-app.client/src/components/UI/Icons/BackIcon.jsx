import React from "react";
import { useChat } from "../ChatRoom/ChatProvider";

const BackIcon = ({ onAddRoom, showJoinCreate }) => {
  const { currentRoom, switchRoom } = useChat();
  return (
    <svg
      className="back-icon"
      width="48px"
      height="48px"
      viewBox="-178 -178 1424 1424"
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        if (showJoinCreate) {
          onAddRoom();
        } else {
          switchRoom(null);
        }
      }}
      opacity={currentRoom ? "100%" : "0%"}
      cursor={currentRoom ? "pointer" : "cursor"}
    >
      <path
        d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
        fill="#1D1B20"
      />
    </svg>
  );
};

export default BackIcon;
