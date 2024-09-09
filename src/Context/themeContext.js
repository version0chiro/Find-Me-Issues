// import { createContext, useState } from "react";

// export const ThemeContext = createContext()

// //Theme modes 
// const light = {mode: 'light', color: 'black', bg: 'white'}
// const dark = {mode: 'dark', color: 'white', bg: '#020300'}

// //Get the system theme
// let systemTheme = {}
// window.matchMedia('(prefers-color-scheme: dark)').matches ? systemTheme = dark : systemTheme = light

// export function ThemeProvider(props) {
//     const [theme, setTheme] = useState(systemTheme)

//     //Handle theme change
//     function changeTheme() {
//         theme.mode === 'light' ? setTheme(dark) : setTheme(light)
//     }

//     return <ThemeContext.Provider value={{theme: theme, changeTheme: changeTheme}}>
//         {props.children}
//     </ThemeContext.Provider>
// }
import { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// Theme modes
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

// Function to get the system theme preference
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;
};

// ThemeProvider component
export function ThemeProvider(props) {
  // Initialize theme state
  const [theme, setTheme] = useState(() => {
    // Load the theme from local storage or fallback to system theme
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? JSON.parse(savedTheme) : getSystemTheme();
  });

  // Handle theme change
  function changeTheme() {
    const newTheme = theme.mode === 'light' ? dark : light;
    setTheme(newTheme);
    localStorage.setItem('themeMode', JSON.stringify(newTheme)); // Save theme to local storage
  }

  // Effect to apply the theme to the document body (if needed)
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.color;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
