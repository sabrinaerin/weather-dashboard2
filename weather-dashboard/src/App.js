import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './Components/SearchBar/SearchBar';
import WeatherDetails from './Components/WeatherDetails/WeatherDetails';
import HourlyTemps from './Components/HourlyTemps/HourlyTemps';


const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    navigate('/weather-details');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Weather Search</h1>
              <p>Search for cities and get location suggestions instantly!</p>
              <SearchBar onCitySelect={handleCitySelect} />
            </>
          }
        />
        <Route
          path="/weather-details"
          element={
            <WeatherDetails city={selectedCity} />
          }
        />
        <Route
          path="/hourly-temps"
          element={
            <HourlyTemps city={selectedCity} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
