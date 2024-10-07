import React, { useEffect } from "react";
import ChatContainer from "./ChatContainer/ChatContainer";
import MessageField from "./MessageField/MessageField";
import TopNav from "./TopNav/TopNav";
import { useState } from "react";
import { useChat } from "./ChatProvider";
import { jwtDecode } from "jwt-decode";

const ChatRoom = () => {
  const { joinRoom, connection, createRoom } = useChat();
  const [roomName, setRoomName] = useState("Wag12");
  const token = localStorage.getItem("jwtToken");
  let loggedInUsername = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      loggedInUsername = decodedToken.unique_name;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  useEffect(() => {
    if (connection) {
      joinRoom(roomName);
    }
  }, [connection]);

  return (
    <>
      <TopNav roomName={roomName} />
      <ChatContainer loggedInUsername={loggedInUsername} />
      <MessageField roomName={roomName} />
    </>
  );
};

export default ChatRoom;
