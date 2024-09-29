import React from "react";
import ChatContainer from "./UI/ChatContainer/ChatContainer";
import MessageField from "./UI/MessageField/MessageField";
import TopNav from "./UI/TopNav/TopNav";
import { useState } from "react";

const ChatRoom = () => {
  const { roomName, setRoomName } = useState("Wag11");

  return (
    <>
      <TopNav roomName={roomName} />
      <ChatContainer roomName={roomName} />
      <MessageField roomName={roomName} />
    </>
  );
};

export default ChatRoom;
