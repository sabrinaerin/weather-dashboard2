// src/Components/SearchBar/SearchBar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { server } from '../../mocks/server';
import { rest } from 'msw';

test('Test Dropdown rendering for correct suggestions', async () => {
    server.use(
      rest.get('http://localhost:5000/api/locations', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            { name: 'Philadelphia', state: 'Pennsylvania', country: 'US' },
            { name: 'Miami', state: 'Florida', country: 'US' },
          ])
        );
      })
    );
  
    render(<SearchBar />);
  
    // Simulate user typing in the search bar
    const inputElement = screen.getByPlaceholderText(/search city.../i);
    fireEvent.change(inputElement, { target: { value: 'Ph' } });
  
    // Wait for suggestions to render
    const suggestion1 = await screen.findByText('Philadelphia, Pennsylvania, US');
    const suggestion2 = await screen.findByText('Miami, Florida, US');
  
    expect(suggestion1).toBeInTheDocument();
    expect(suggestion2).toBeInTheDocument();
  });

test('City Search Input', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/search city.../i);
  expect(inputElement).toBeInTheDocument();
});

test('Dropdown Rendering', async () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/search city.../i);
  fireEvent.change(inputElement, { target: { value: 'New' } });
  const suggestion1 = await screen.findByText('New York, NY, US');
  expect(suggestion1).toBeInTheDocument();
});
