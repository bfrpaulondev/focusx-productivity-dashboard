// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import TaskReport from './pages/TaskReport';
import Reminders from './pages/Reminders';
import NotFound from './pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/task/:id/edit" element={<TaskForm />} />
        <Route path="/report" element={<TaskReport />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
