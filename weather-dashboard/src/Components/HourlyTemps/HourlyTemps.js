import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HourlyTemps.module.css';

const HourlyTemps = ({ city }) => {
  const [hourlyData, setHourlyData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHourlyData = async () => {
      if (!city) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/hourly?lat=${city.lat}&lon=${city.lon}`
        );
        const data = await response.json();
        setHourlyData(data);
      } catch (error) {
        console.error('Error fetching hourly data:', error);
      }
    };
    fetchHourlyData();
  }, [city]);

  if (!hourlyData) return <p>Loading hourly data...</p>;

  return (
    <div className={styles.hourlyTemps}>
      <h2>Hourly Forecast for {city.name}</h2>
      {hourlyData.map((hour, index) => (
        <div key={index} className={styles.hourlyTempCard}>
          <p>{hour.time}: {hour.temperature}°F</p>
        </div>
      ))}
      <button className="backButton" onClick={() => navigate('/weather-details')}>Back to Weather Details</button>
    </div>
  );
};

export default HourlyTemps;
