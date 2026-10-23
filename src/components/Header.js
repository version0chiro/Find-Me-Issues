import { Navbar, Container } from "react-bootstrap";
import "./Header.css";
import { useContext, useState } from "react";
import logo from "./../logo.png";
import logo_white from "./../logo-white.png";
import { useDebouncedCallback } from "use-debounce";

// Context
import { ThemeContext } from "../Context/themeContext";
import Darkmode from "./Buttons/Darkmode";
import CustomSelect from "./Buttons/Language";

const Header = ({ language, setLanguage, setInputSearch }) => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const [input, setInput] = useState("");
  const [inputExpanded, setInputExpanded] = useState(false);

  // debounce search
  const debouncedInput = useDebouncedCallback((value) => {
    setInputSearch(value);
  }, 1000);

  // input handler
  const handleInputSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedInput(value);
  };

  return (
    <Navbar id="header">
      <Container className="flex lg:flex-row flex-col justify-center items-center w-full px-4">
        
        {/* Logo */}
        <Navbar.Brand href="/" className="d-none d-sm-block">
          <img
            src={theme.mode === "light" ? logo_white : logo}
            alt="Logo"
            className="w-24 h-24"
          />
        </Navbar.Brand>

        <div className="flex justify-around items-center gap-11 w-full">
          
          {/* Search + Select */}
          <label
            className={`${
              theme.mode === "light" ? "bg-slate-200" : "bg-slate-500"
            } flex rounded-3xl p-2 h-11 w-full md:w-[40rem]`}
          >
            <CustomSelect
              theme={theme}
              language={language}
              setLanguage={setLanguage}
            />

            <input
              type="text"
              className={`transition-all h-7 ml-2 border-l-2 border-l-violet-950 pl-2 duration-300 ease-in-out focus:outline-none bg-transparent ${
                inputExpanded
                  ? "w-1/2 pl-5 border-b-2 border-b-slate-300"
                  : "w-1/2"
              } ${
                theme.mode === "dark"
                  ? "text-slate-200 opacity-100"
                  : "text-slate-800 opacity-70"
              }`}
              placeholder="Search"
              autoComplete="off"
              value={input}
              onFocus={() => setInputExpanded(true)}
              onBlur={() => setTimeout(() => setInputExpanded(false), 150)}
              onChange={handleInputSearch}
            />
          </label>

          {/* Dark Mode */}
          <div
            onClick={changeTheme}
            className="cursor-pointer max-lg:!hidden hover:scale-105 transition-all duration-200"
            style={{ fontSize: "1.5rem" }}
          >
            <Darkmode />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;