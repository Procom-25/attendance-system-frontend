import React, { useState } from "react";
import "./AttendanceForm.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const backendUrl = "https://attendance-backend-lac.vercel.app";
console.log("Backend URL:", backendUrl);

const AttendanceForm = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        toast.error("Geolocation is not supported by your browser");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const location = await getLocation();
      console.log("Submitted code:", code);
      console.log("Location:", location);

      const response = await axios.post(`${backendUrl}/user/verify`, {
        teamcode: code,
        longitude: location.longitude,
        latitude: location.latitude,
      });

      console.log("✅ Connection successful:", response.data);
      toast.success("Attendance Marked Successfully");
      setError("");
      setCode("");
      navigate("/");
    } catch (err) {
      console.error(
        "❌ Error submitting data:",
        err.response ? err.response.data : err.message
      );
      setError("Error submitting data: " + err.message);
      toast.error(`Error in Marking Attendance: ${err.message}`);
    } finally {
      setIsLoading(false); // Stop loading
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
            disabled={isLoading} // Disable input while loading
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
      <div className="help-button">
        <button className="help-icon">?</button>
      </div>
    </div>
  );
};

export default AttendanceForm;
