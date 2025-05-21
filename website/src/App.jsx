import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
import "./App.css";
import Plans from "./pages/Plans";
import Withdraw from "./pages/Withdraw";
import Deposit from "./pages/Deposit";




function App() {
  return (
    <Router>
      <a href="https://wa.me/+447366326840" target="_blank" class="whatsapp-button">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
</a> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/deposit" element={<Deposit />} />
      </Routes>
    </Router>
  );
}

export default App;
