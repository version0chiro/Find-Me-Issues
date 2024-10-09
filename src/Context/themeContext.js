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

  // Handling theme change
  const changeTheme = () => {
    const newTheme = theme.mode === "light" ? dark : light;
    setTheme(newTheme);
  };

  // Updating localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Memoizing the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ theme, changeTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
