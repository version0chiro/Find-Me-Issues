import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

//Theme modes 
const light = {mode: 'light', color: 'black', bg: 'white'}
const dark = {mode: 'dark', color: 'white', bg: '#020300'}

//Get the system theme
let systemTheme = {}
window.matchMedia('(prefers-color-scheme: dark)').matches ? systemTheme = dark : systemTheme = light

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(systemTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme === 'light' ? light : dark);
        }else {
            localStorage.setItem('theme', systemTheme.mode);
        }
    }, []);

    //Handle theme change
    function changeTheme() {
        const newTheme = theme.mode === 'light' ? dark : light;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme.mode);
    }

    return <ThemeContext.Provider value={{theme: theme, changeTheme: changeTheme}}>
        {props.children}
    </ThemeContext.Provider>
}