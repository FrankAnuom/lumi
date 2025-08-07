import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/dashboard"   element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }/>
    </Routes>
  );
}

export default App;
