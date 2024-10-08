import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
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

      newConnection.on("ReceiveMessage", (user, message) => {
        console.log("Message received from server:", user, message);
        setMessages((prevMessages) => [...prevMessages, { user, message }]);
      });

      newConnection.on("ReceiveRooms", (roomsArray) => {
        console.log("Rooms received from server:", roomsArray);
        setRooms(roomsArray);
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
        await connection.invoke("SendMessage", roomName, message);
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
      }
    } else {
      console.error("Connection is not established or still starting.");
    }
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
    messages,
    rooms,
    sendMessage,
    createRoom,
    joinRoom,
    getRooms,
    connection,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook to use chat
export const useChat = () => {
  return useContext(ChatContext);
};
