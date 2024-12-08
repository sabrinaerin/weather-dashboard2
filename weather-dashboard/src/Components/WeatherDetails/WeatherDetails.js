import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const WeatherDetails = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('imperial'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/weather?lat=${city.lat}&lon=${city.lon}&units=${unit}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'imperial' ? 'metric' : 'imperial'));
  };

  if (!weatherData) return <p>Loading weather data...</p>;

  return (
    <div className="weatherDetailsCard">
      <h2>Weather in {city.name}</h2>
      <p>Temperature: {weatherData.temperature}°{unit === 'imperial' ? 'F' : 'C'}</p>
      <p>Feels Like: {weatherData.feelsLike}°{unit === 'imperial' ? 'F' : 'C'}</p>
      <p>Description: {weatherData.description}</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Wind Speed: {weatherData.windSpeed} m/s</p>
      <p>Sunrise: {weatherData.sunrise}</p>
      <p>Sunset: {weatherData.sunset}</p>
      <button onClick={toggleUnit}>
        Switch to {unit === 'imperial' ? 'Celsius' : 'Fahrenheit'}
      </button>
      <br />
      <button className="backButton" onClick={() => navigate('/hourly-temps')}>View Hourly Forecast</button>
      <button className="backButton" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default WeatherDetails;
