import { createContext, useState, useEffect, useMemo } from "react";

export const ThemeContext = createContext();

// Theme modes
const light = { mode: "light", color: "black", bg: "white" };
const dark = { mode: "dark", color: "white", bg: "#020300" };

// Get the system theme
const getInitialTheme = () => {
  const savedTheme = JSON.parse(localStorage.getItem("theme"));
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? dark
    : light;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme());

  // Handle theme change
  const changeTheme = () => {
    const newTheme = theme.mode === "light" ? dark : light;
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, changeTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
