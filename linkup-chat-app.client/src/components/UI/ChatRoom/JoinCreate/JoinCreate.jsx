import React, { useState } from "react";
import "./JoinCreate.css";
import { useChat } from "../ChatProvider";

const JoinCreate = () => {
  const [mode, setMode] = useState("Join");
  const [error, setError] = useState("");
  const [roomName, setRoomName] = useState("");
  const { joinRoom, createRoom, switchRoom } = useChat();

  const handleSubmit = async () => {
    if (!roomName) {
      setError("Please enter a room name.");
      return;
    }

    if (mode === "Create") {
      // Handle room creation
      try {
        await createRoom(roomName); // This will throw an error if the room create fails
        console.log("Creating room:", roomName);

        await joinRoom(roomName); // This will throw an error if the room join fails
        console.log("Joining room:", roomName);

        switchRoom(roomName); // Only called if joinRoom is successful
      } catch (err) {
        setError("Error while creating room, try again later.");
        console.error("Error creating room:", err);
      }
    } else if (mode === "Join") {
      // Handle room joining
      try {
        await joinRoom(roomName);
        console.log("Joining room:", roomName);
        switchRoom(roomName);
      } catch (err) {
        setError("Room does not exist.");
        console.error("Error joining room:", err);
      }
    }

    // Reset the input after handling
    setRoomName("");
  };

  return (
    <div className="join-create-container">
      {error && <div className="error">{error}</div>}
      <div className="join-create-btns">
        <div className="join-create-btn" onClick={() => setMode("Join")}>
          <p
            className={`join-create-text ${mode === "Join" ? "selected" : ""}`}
          >
            Join
          </p>
        </div>

        <div className="join-create-btn" onClick={() => setMode("Create")}>
          <p
            className={`join-create-text ${
              mode === "Create" ? "selected" : ""
            }`}
          >
            Create
          </p>
        </div>
      </div>
      <div className="join-create-input">
        <p className="text-field-header">Room name:</p>
        <input
          type="text"
          className="text-field"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="join-create-submit">
        <button className="btn-primary" onClick={handleSubmit}>
          {mode === "Join" ? "Join" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default JoinCreate;
