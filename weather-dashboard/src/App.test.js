
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../../App'; 
test('Link Functionality', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  
  const link = screen.getByRole('link', { name: /Hourly Temperature/i });
  expect(link).toHaveAttribute('href', '/hourly-temperature');
});
