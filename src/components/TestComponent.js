import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TestComponent.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log("Backend URL:", backendUrl);

const TestComponent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/test4594/${id}`);
        setData(response.data);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="left-aligned">
      <h1>React and Backend API Integration</h1>

      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Fetched Events:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestComponent;
