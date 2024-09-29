import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connect = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7261/chatHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

      newConnection.on("ReceiveMessage", (user, message) => {
        console.log("Message received from server:", user, message);
        setMessages((prevMessages) => [...prevMessages, { user, message }]);
      });

      await newConnection.start();
      setConnection(newConnection);
    };

    connect();

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
        connection.stop();
      }
    };
  }, []);

  const sendMessage = async (roomName, user, message) => {
    if (connection) {
      try {
        await connection.invoke("SendMessage", roomName, user, message);
      } catch (error) {
        console.error("Failed to send message: ", error);
      }
    }
  };

  const joinRoom = async (roomName) => {
    if (connection) {
      try {
        await connection.invoke("JoinRoom", roomName);
      } catch (error) {
        console.error("Failed to join room: ", error);
      }
    }
  };

  const value = {
    messages,
    sendMessage,
    joinRoom,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook to use chat
export const useChat = () => {
  return useContext(ChatContext);
};
