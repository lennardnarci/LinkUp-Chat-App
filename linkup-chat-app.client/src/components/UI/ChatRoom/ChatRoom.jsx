import React, { useEffect } from "react";
import ChatContainer from "./ChatContainer/ChatContainer";
import MessageField from "./MessageField/MessageField";
import TopNav from "./TopNav/TopNav";
import { useState } from "react";
import { useChat } from "./ChatProvider";

const ChatRoom = () => {
  const { joinRoom, connection } = useChat();
  const [roomName, setRoomName] = useState("Wag12");

  useEffect(() => {
    if (connection) {
      joinRoom(roomName);
    }
  }, [connection]);

  return (
    <>
      <TopNav roomName={roomName} />
      <ChatContainer />
      <MessageField roomName={roomName} />
    </>
  );
};

export default ChatRoom;
