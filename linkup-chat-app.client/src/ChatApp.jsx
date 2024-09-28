import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useSignalR } from "react-signalr";

const ChatApp = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("User1");

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7261/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");

          connection.on("ReceiveMessage", (user, message) => {
            setMessages((prevMessages) => [...prevMessages, { user, message }]);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) {
      try {
        await connection.send("SendMessage", user, message);
        setMessage("");
      } catch (e) {
        console.error("Sending message failed: ", e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
