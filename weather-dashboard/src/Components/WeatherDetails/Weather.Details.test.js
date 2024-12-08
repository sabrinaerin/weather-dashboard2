// src/Components/WeatherDetails/WeatherDetails.test.js
import { render, screen, waitFor } from '@testing-library/react';
import WeatherDetails from './WeatherDetails';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { useNavigate } from 'react-router-dom';

server.use(
  rest.get('https://api.openweathermap.org/data/2.5/weather', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        main: { temp: 295.15, feels_like: 293.15 },
        weather: [{ description: 'clear sky' }],
        wind: { speed: 3.1 },
        sys: { sunrise: 1633455600, sunset: 1633500000 },
      })
    );
  })
);

test('Weather Data Rendering', async () => {
  render(<WeatherDetails city="London" />);
  await waitFor(() => {
    expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  });
});

test('Error Handling', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch weather data'));
  render(<WeatherDetails city="London" />);
  await waitFor(() => {
    const errorMessage = screen.getByText(/Failed to fetch weather data/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
