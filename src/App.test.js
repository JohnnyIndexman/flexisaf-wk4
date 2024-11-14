import { render, screen } from '@testing-library/react';
import App from './App';


test('renders Nav, Home, and Footer components', () => {
  render(<App />);
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();

  const homeElement = screen.getByRole('home-page');
  expect(homeElement).toBeInTheDocument();

  const footerElement = screen.getByRole('contentinfo');
  expect(navElement).toBeInTheDocument();
});

