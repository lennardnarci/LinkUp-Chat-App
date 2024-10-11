import React, { useEffect } from "react";
import ChatContainer from "./ChatContainer/ChatContainer";
import MessageField from "./MessageField/MessageField";
import TopNav from "./TopNav/TopNav";
import { useState } from "react";
import { useChat } from "./ChatProvider";
import { jwtDecode } from "jwt-decode";
import ChatRoomList from "./ChatRoomList/ChatRoomList";
import JoinCreate from "./JoinCreate/JoinCreate";
import "./ChatRoom.css";

const ChatRoom = () => {
  const { currentRoom, switchRoom } = useChat();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showJoinCreate, setShowJoinCreate] = useState(false);
  const token = localStorage.getItem("jwtToken");
  let loggedInUsername = "";

  useEffect(() => {
    // Detect if the view is mobile or desktop based on window size
    const handleResize = () => {
      console.log(isMobileView);
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentRoom) {
      setShowJoinCreate(false);
    }
  }, [currentRoom]);

  const handleAddRoom = (bool) => {
    console.log(bool);
    setShowJoinCreate(!showJoinCreate);
  };

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      loggedInUsername = decodedToken.unique_name;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <>
      <TopNav
        roomName={currentRoom || <div className="logo">LinkUp</div>}
        isMobileView={isMobileView}
        onAddRoom={handleAddRoom}
        showJoinCreate={showJoinCreate}
      />
      <div className="chatroom-layout">
        {isMobileView ? (
          // Mobile view: show either the room list or chat container
          currentRoom ? (
            <>
              <ChatContainer loggedInUsername={loggedInUsername} />
              <MessageField roomName={currentRoom} />
            </>
          ) : showJoinCreate ? (
            <JoinCreate />
          ) : (
            <ChatRoomList />
          )
        ) : (
          // Desktop view: show both room list and chat container
          <>
            <ChatRoomList />
            {showJoinCreate ? (
              <div className="join-create-layout">
                <JoinCreate />
              </div>
            ) : (
              <>
                {currentRoom ? (
                  <div className="chat-container-layout">
                    <ChatContainer loggedInUsername={loggedInUsername} />
                    <MessageField roomName={currentRoom} />
                  </div>
                ) : (
                  <>
                    <div className="chat-container-layout">
                      <ChatContainer loggedInUsername={loggedInUsername} />
                      <MessageField roomName={currentRoom} />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChatRoom;
