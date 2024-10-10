import { createContext, useState } from 'react';

export const ThemeContext = createContext();

//Theme modes
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

//Get the system theme
let systemTheme = {};
window.matchMedia('(prefers-color-scheme: dark)').matches
  ? (systemTheme = dark)
  : (systemTheme = light);

export function ThemeProvider(props) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? (savedTheme === 'light' ? light : dark) : systemTheme;
  });

  //Handle theme change
  function changeTheme() {
    const newTheme = theme.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    theme.mode === 'light' ? setTheme(dark) : setTheme(light);
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
