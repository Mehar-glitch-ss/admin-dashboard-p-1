// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

function Placeholder({ title }) {
  return (
    <div className="p-6 text-lg">
      This is the {title} page (work in progress)
    </div>
  );
}

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar - full width at top */}
      <Navbar />

      {/* Main area: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Sidebar on left */}
        <div className="w-64 bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Main content area on right */}
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/plans" element={<Placeholder title="Plans" />} />
            <Route
              path="/contacts"
              element={<Placeholder title="Contacts" />}
            />
            <Route path="/logs" element={<Placeholder title="Logs" />} />
            <Route
              path="/settings"
              element={<Placeholder title="Settings" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
