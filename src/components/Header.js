import { useContext, useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";
import logo_white from "./../logo-white.png";
import logo from "./../logo.png";
import "./Header.css";
// Context
import { ThemeContext } from "../Context/themeContext";
import Darkmode from "./Buttons/Darkmode";
import CustomSelect from "./Buttons/Language";

const Header = ({ language, setLanguage, setInputSearch }) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [input, setInput] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const debouncedInput = useDebouncedCallback((value) => {
    setInputSearch(value);
  }, 1000);

  const handleThemeChange = () => {
    setIsTransitioning(true);
    changeTheme();
    setTimeout(() => setIsTransitioning(false), 300); // 匹配动画时长
  };

  const handleInputSearch = (inputValue) => {
    setInputExpanded(true);
    setInput(inputValue);
    debouncedInput(inputValue);
  };

  useEffect(() => {
    setInputSearch(input);
  }, [input, setInputSearch]);

  const [inputExpanded, setInputExpanded] = useState(false);

  const handleSearchClick = () => {
    setInputExpanded((prev) => !prev);
  };

  return (
    <Navbar
      id="header"
      className={`theme-transition ${isTransitioning ? "transitioning" : ""}`}
    >
      <Container className="flex lg:flex-row flex-col justify-center items-center w-full px-4">
        <Navbar.Brand href="/" className="d-none d-sm-block">
          <img
            src={theme.mode === "light" ? logo_white : logo}
            alt="Logo"
            className="w-24 h-24 transition-logo"
          />
        </Navbar.Brand>

        <div className="flex justify-around items-center gap-11 w-full">
          <label
            className={`${
              theme.mode === "light" ? "bg-slate-200" : "bg-slate-500"
            } flex rounded-3xl p-2 h-11 w-full md:w-[40rem] transition-bg`}
          >
            <CustomSelect
              theme={theme}
              language={language}
              setLanguage={setLanguage}
            />
            <input
              type="text"
              className={`transition-all h-7 ml-2 border-solid border-l-2 border-l-violet-950 pl-2 duration-1000 ease-in-out focus:outline-none outline-none ${
                inputExpanded
                  ? "w-1/2 pl-5 border-b-slate-300 border-b-2 border-solid"
                  : "w-1/2"
              } bg-transparent ${
                theme.mode === "dark"
                  ? "opacity-100 text-slate-200"
                  : "opacity-70 text-slate-800"
              } transition-text`}
              placeholder="Search"
              autoComplete="off"
              onMouseEnter={handleSearchClick}
              onMouseLeave={handleSearchClick}
              onKeyUp={(e) => handleInputSearch(e.target.value)}
            />
          </label>
          <div
            onClick={handleThemeChange}
            className="cursor-pointer max-lg:!hidden hover:scale-105 transition-all ease-linear duration-200"
            style={{ fontSize: "1.5rem" }}
            aria-hidden="true"
          >
            <Darkmode />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
