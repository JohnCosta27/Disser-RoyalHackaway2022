import React from 'react';
import DissContainer from './disses/DissContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ResponseView from './ResponseView';
import DissState from './state/DissState';
import MainLayout from './layout/MainLayout';
import Profile from './pages/Profile';
import { hasValidAccessToken } from '../api/TokenHandler';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />} />
          <Route path="/response" element={<ResponseView />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
