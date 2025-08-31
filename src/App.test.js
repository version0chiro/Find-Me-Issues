import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Shell text", () => {
  render(<App />);
  const element = screen.getByText(/Shell/i);
  expect(element).toBeInTheDocument();
});
