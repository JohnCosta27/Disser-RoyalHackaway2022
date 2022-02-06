import React from "react";
import DissContainer from "./disses/DissContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResponseView from "./ResponseView";
import DissState from "./state/DissState";
import MainLayout from "./layout/MainLayout";
import Register from "./Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/response" element={<ResponseView />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
