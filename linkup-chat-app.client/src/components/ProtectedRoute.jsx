import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, redirect to login
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // If token is invalid, also redirect to login
    console.error("Invalid token: ", error);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
