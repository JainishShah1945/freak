import "./App.css";
import Home from "./components/screen/Home";
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Login from "./components/screen/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/screen/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./components/screen/Myorder";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
