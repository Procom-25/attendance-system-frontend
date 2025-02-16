import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AttendanceForm from './components/AttendanceForm';
import BackupAttendanceForm from './components/BackupAttendanceForm';
import './App.css';

// Unique hashed endpoint for backup form
const BACKUP_HASH = "8f3da5b1e6c4d2a9"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AttendanceForm />} />
          <Route path={`/backup/${BACKUP_HASH}`} element={<BackupAttendanceForm />} />
          {/* Redirect any /backup attempts without hash */}
          <Route path="/backup" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
