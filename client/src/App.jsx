import React from "react";
import { Routes, Route } from "react-router-dom";
import Parks from "./pages/Parks";
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { ResortProvider } from "./context/ResortContext";
import "./style/Header.css";
import "./style/index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/parks" element={<Parks />} />
      <Route path="/home" element={<Home />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/achievements" element={<Achievements />} />
    </Routes>
  );
}

export default App;
