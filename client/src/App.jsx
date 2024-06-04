import React from "react";
import { Routes, Route } from 'react-router-dom';
import Parks from "./pages/Parks";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Landing from "./pages/Landing"
import Plan from "./pages/Plan";
import './style/index.css';
import './style/Header.css';


function App() {
  return (
    <Routes>
      <Route path="/parks" element={<Parks />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/landing" element={<Landing />}/>
      <Route path="/collection" element={<Collection />}/>
      <Route path="/plan-your-trip" element={<Plan />}/>
    </Routes>
  );
}

export default App;
