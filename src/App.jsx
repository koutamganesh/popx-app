import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PhoneShell from './components/PhoneShell';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

const App = () => {
  return (
    <PhoneShell>
      <Routes>
        <Route path="/"         element={<WelcomePage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account"  element={<AccountPage />} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneShell>
  );
};

export default App;
