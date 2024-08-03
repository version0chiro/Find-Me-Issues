

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

// Theme modes
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

// Get the system theme
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(systemTheme);

    useEffect(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme === 'dark' ? dark : light);
        }
    }, []);

    // Handle theme change
    function changeTheme() {
        const newTheme = theme.mode === 'light' ? dark : light;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme.mode); // Save the new theme to localStorage
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
