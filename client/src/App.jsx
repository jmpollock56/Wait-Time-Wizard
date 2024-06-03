import React from "react";
import { Routes, Route } from 'react-router-dom';
import Parks from "./pages/Parks";
import './style/index.css';
import './style/Header.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Parks />}/>
    </Routes>
  );
}

export default App;
