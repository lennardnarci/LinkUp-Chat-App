import React, { useEffect } from "react";
import ChatContainer from "./UI/ChatContainer/ChatContainer";
import MessageField from "./UI/MessageField/MessageField";
import TopNav from "./UI/TopNav/TopNav";
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
      <TopNav />
      <ChatContainer />
      <MessageField roomName={roomName} />
    </>
  );
};

export default ChatRoom;
