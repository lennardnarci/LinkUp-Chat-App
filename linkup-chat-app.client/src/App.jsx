import "./App.css";
import React, { useState, useEffect } from 'react';
import { createSignalRContext } from "react-signalr/signalr";
import ChatApp from "./ChatApp"; // Import the previously created ChatApp component

// Create a SignalR context
const SignalRContext = createSignalRContext();

function App() {
  const [token, setToken] = useState(""); // Token can be set if using authentication

  return (
    <SignalRContext.Provider
      connectEnabled={!!token}
      accessTokenFactory={() => token}
      dependencies={[token]} // Reconnect if the token changes
      url={"http://localhost:5172/chatHub"} // Replace with your actual backend URL
    >
      <ChatApp SignalRContext={SignalRContext} />
    </SignalRContext.Provider>
  );
}

export default App;
