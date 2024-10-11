import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import {
  encryptMessage,
  decryptMessage,
} from "../../../Utils/EncryptionHelper";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [roomMessages, setRoomMessages] = useState({}); // Store messages by room
  const [currentRoom, setCurrentRoom] = useState(null); // Track the current room
  const [rooms, setRooms] = useState([]);

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token

  if (!token) {
    console.error("No authentication token found");
    return;
  }

  useEffect(() => {
    const connect = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7261/chatHub", {
          accessTokenFactory: () => token,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withServerTimeout(60000)
        .build();

      newConnection.on(
        "ReceiveMessage",
        (roomName, user, encryptedMessage, timestamp) => {
          console.log(
            "Message received from server:",
            roomName,
            user,
            encryptedMessage,
            timestamp
          );

          //Decrypt the message if it's encrypted
          const decryptedMessage = decryptMessage(encryptedMessage);
          console.log(encryptedMessage);
          console.log(decryptedMessage);
          const message =
            decryptedMessage !== "" ? decryptedMessage : encryptedMessage;

          setRoomMessages((prevRoomMessages) => {
            // Create or update the message list for the room
            const updatedRoomMessages = { ...prevRoomMessages };
            if (!updatedRoomMessages[roomName]) {
              updatedRoomMessages[roomName] = []; // Initialize if empty
            }
            updatedRoomMessages[roomName].push({ user, message, timestamp });
            return updatedRoomMessages;
          });
        }
      );

      newConnection.on("ReceiveRooms", (roomsWithLatestMessages) => {
        console.log("Rooms received from server:", roomsWithLatestMessages);

        //Decrypt the latest message in each room.
        const decryptedRooms = roomsWithLatestMessages.map((room) => {
          const decryptedMessage = decryptMessage(room.latestMessage); // Decrypt the message
          return {
            ...room, // Spread the existing room properties
            latestMessage: decryptedMessage, // Replace with the decrypted message
          };
        });
        console.log(decryptedRooms);
        setRooms(decryptedRooms);
      });

      await newConnection.start();
      setConnection(newConnection);
    };

    connect();

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
        connection.off("ReceiveRooms");
        connection.stop();
      }
    };
  }, []);

  const sendMessage = async (roomName, message) => {
    if (connection) {
      try {
        await connection.invoke(
          "SendMessage",
          roomName,
          encryptMessage(message)
        );
      } catch (error) {
        console.error("Failed to send message: ", error);
      }
    }
  };

  const createRoom = async (roomName) => {
    try {
      await connection.invoke("CreateRoom", roomName);
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  };

  const joinRoom = async (roomName) => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await connection.invoke("JoinRoom", roomName);
      } catch (error) {
        console.error("Failed to join room:", error);
        throw error;
      }
    } else {
      const connectionError = new Error(
        "Connection is not established or still starting."
      );
      console.error(connectionError.message);
      throw connectionError;
    }
  };

  const switchRoom = (roomName) => {
    // Change the current room to display the new rooms messages
    console.log(`Switched room to ${roomName}`);
    setCurrentRoom(roomName);
  };

  const getRooms = async () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await connection.invoke("getRooms");
      } catch (error) {
        console.error("Error getting rooms:", error);
      }
    } else {
      console.error("Connection is not established or still starting.");
    }
  };

  const value = {
    roomMessages,
    currentRoom,
    rooms,
    sendMessage,
    createRoom,
    joinRoom,
    switchRoom,
    getRooms,
    connection,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook to use chat
export const useChat = () => {
  return useContext(ChatContext);
};
