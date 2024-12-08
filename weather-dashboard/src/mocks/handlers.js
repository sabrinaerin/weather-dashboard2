// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5000/api/locations', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: 'London', state: '', country: 'GB' },
        { name: 'New York', state: 'NY', country: 'US' },
      ])
    );
  }),

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
  }),
];
