import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); 

const app = express();
const apiKey = process.env.OPENWEATHER_API_KEY;  

const allowedOrigins = ['http://localhost:3000']; 
app.use(cors({ origin: allowedOrigins }));

// Route to fetch location data based on user input
app.get('/api/locations', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        // Use OpenWeather Geo API to get location data
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(500).json({ message: 'Failed to fetch location data from OpenWeather API' });
        }

        const data = await response.json();
        res.json(data);  // Send the location data back to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/api/hourly', async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
  
    try {
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Process hourly data
      const hourlyData = data.list.slice(0, 24).map((entry) => ({
        time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: entry.main.temp,
      }));
  
      res.json(hourlyData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to fetch hourly weather data.' });
    }
  });

// Route to fetch weather details based on latitude and longitude
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon, units = 'imperial' } = req.query; 
        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and longitude parameters are required' });
        }

        // Use OpenWeather One Call API to get weather details
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(500).json({ message: 'Failed to fetch weather details from OpenWeather API' });
        }

        const data = await response.json();

        //  format the weather details
        const weatherDetails = {
            temperature: data.current.temp,
            feelsLike: data.current.feels_like,
            description: data.current.weather[0].description,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_speed,
            sunrise: new Date(data.current.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.current.sunset * 1000).toLocaleTimeString(),
            hourlyForecast: data.hourly.map(hour => ({
                time: new Date(hour.dt * 1000).toLocaleTimeString(),
                temperature: hour.temp,
            })),
        };

        res.json(weatherDetails); // Send the weather details back to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
