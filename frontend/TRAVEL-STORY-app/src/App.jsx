import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for redirection
import React from 'react';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect from root to dashboard */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/login" />
    );
};
export default App;