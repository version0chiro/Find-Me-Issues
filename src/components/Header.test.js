import { render } from "@testing-library/react";
import Header from "./Header";
import { ThemeContext } from "../Context/themeContext";

const mockTheme = {
  theme: { mode: "light", color: "black", bg: "white" },
  changeTheme: jest.fn(),
};

test("Header component structure remains consistent", () => {
  const { asFragment } = render(
    <ThemeContext.Provider value={mockTheme}>
      <Header language="JavaScript" setLanguage={jest.fn()} setInputSearch={jest.fn()} />
    </ThemeContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
