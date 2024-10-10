import React, { useCallback, useEffect, useState } from "react";
import { useChat } from "../ChatProvider";
import "./TopNav.css";
import SettingsIcon from "../../Icons/SettingsIcon";
import AddIcon from "../../Icons/AddIcon";
import BackIcon from "../../Icons/BackIcon";

const TopNav = ({ roomName, isMobileView, onAddRoom, showJoinCreate }) => {
  const { currentRoom, switchRoom } = useChat();

  return (
    <div className="top-nav-bar">
      {/* If it's mobile view, show back button, otherwise show add button.*/}
      {!isMobileView ? (
        <AddIcon onAddRoom={onAddRoom} showJoinCreate={showJoinCreate} />
      ) : (
        <>
          {isMobileView && !showJoinCreate ? (
            <BackIcon onClick={() => switchRoom(null)} /> // Back to room list
          ) : (
            <BackIcon onAddRoom={onAddRoom} showJoinCreate={showJoinCreate} />
          )}
        </>
      )}

      <h1 className="top-nav-header">{roomName}</h1>

      {/* Only show settings icon when not on mobile */}
      {!isMobileView ? <SettingsIcon /> : <AddIcon onAddRoom={onAddRoom} />}
    </div>
  );
};

export default TopNav;
