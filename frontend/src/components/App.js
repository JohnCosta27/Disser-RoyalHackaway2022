import React from 'react';
import DissContainer from './disses/DissContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ResponseView from './ResponseView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DissContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/response" element={<ResponseView />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
