import React from 'react';
import DissContainer from './disses/DissContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DissContainer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
