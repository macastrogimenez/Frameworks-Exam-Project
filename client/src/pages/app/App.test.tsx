import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// by @macastrogimenez TODO: This test component can be deleted or modified into whatever else


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
