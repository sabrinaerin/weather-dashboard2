// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Close the server after all tests.
afterAll(() => server.close());
