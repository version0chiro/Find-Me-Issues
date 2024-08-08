import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './Context/themeContext';

test('renders learn react link', () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const linkElement = screen.getByText("Shell");
  expect(linkElement).toBeInTheDocument();
});
