import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/Home.jsx";
import Dashboard from "./pages/RealtorDashboard.jsx";
import LoginPage from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <nav className="p-4 bg-neutral-900 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}
