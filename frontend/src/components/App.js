import React from 'react';
import DissContainer from './disses/DissContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DissContainer />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
