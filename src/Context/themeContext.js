import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

// Theme modes 
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

// Get the system theme
const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;
};

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("custom_theme");
        return savedTheme ? JSON.parse(savedTheme) : getSystemTheme();
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Function to handle theme change
        const handleChange = (e) => {
            const newTheme = e.matches ? dark : light;
            setTheme(newTheme);
            localStorage.setItem("custom_theme", JSON.stringify(newTheme)); // Save to localStorage
        };

        // Initial theme based on current preference
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup function to remove the event listener
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // Handle theme change
    function changeTheme() {
        const newTheme = theme.mode === 'light' ? dark : light;
        localStorage.setItem("custom_theme", JSON.stringify(newTheme)); // Save the new theme to localStorage
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
