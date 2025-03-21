import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AttendanceForm from './components/AttendanceForm';
import BackupAttendanceForm from './components/BackupAttendanceForm';
import TestComponent from './components/TestComponent';
import './App.css';
import  { Toaster } from "react-hot-toast";
// Unique hashed endpoint for backup form
const BACKUP_HASH = "8f3da5b1e6c4d2a9"; 

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AttendanceForm />} />
            <Route
              path={`/backup/${BACKUP_HASH}`}
              element={<BackupAttendanceForm />}
            />
            {/* Redirect any /backup attempts without hash */}
            <Route path="/backup" element={<Navigate to="/" replace />} />
            <Route path="/test4594/:id" element={<TestComponent />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
