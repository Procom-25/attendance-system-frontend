import React, { useState } from "react";
import "./AttendanceForm.css";
import axios from "axios";
// import dotenv from 'dotenv'

// dotenv.config()
const AttendanceForm = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            setError(err.message);
            reject(err);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const location = await getLocation();
      console.log("Submitted code:", code);
      console.log("Location:", location);

      const response = await axios.post("http://localhost:5000/user/verify", {
        teamcode: code,
        longitude: location.longitude,
        latitude: location.latitude,
      });

      alert(response.data.message);
      setError("");
      setCode("");
    } catch (err) {
      setError("Error submitting data: " + err.message);
      setCode("");
    }
  };

  return (
    <div className="attendance-container">
      <div className="form-section">
        <img src="/procom25logo.png" alt="Procom 25" className="logo" />
        <h1>MARK ATTENDANCE</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="help-button">
        <button className="help-icon">?</button>
      </div>
    </div>
  );
};

export default AttendanceForm;
