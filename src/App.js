import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ContactsPage from './pages/ContactsPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

export default function App() {
  const { pathname } = useLocation();
  const isAuthPage =
    pathname === '/' || pathname === '/login' || pathname === '/register';

  return (
    <>
      {/* Navbar shown only on non-auth pages */}
      {!isAuthPage && <Navbar />}

      {isAuthPage ? (
        // AUTH PAGES: no wrapper
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Redirect any unknown route on auth pages to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        // NON-AUTH PAGES: with padding and nav
        <div style={{ padding: 20 }}>
          <Routes>
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            {/* Redirect unknown paths to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </>
  );
}
