import "./App.css";
import React, { useState, useEffect } from "react";
import { createSignalRContext } from "react-signalr/signalr";

// Create a SignalR context
const SignalRContext = createSignalRContext();

function App() {
  const [token, setToken] = useState("");

  return <div> </div>;
}

export default App;
