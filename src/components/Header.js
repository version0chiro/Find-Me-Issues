import { Navbar, Container } from "react-bootstrap";
import "./Header.css";
import { useContext, useState, useEffect, useCallback } from "react";
import logo from "./../logo.png";
import logo_white from "./../logo-white.png";
import { useDebouncedCallback } from "use-debounce";
// Context
import { ThemeContext } from "../Context/themeContext";
import Darkmode from "./Buttons/Darkmode";
import CustomSelect from "./Buttons/Language";

const Header = ({ language, setLanguage, setInputSearch }) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [_, setInput] = useState(""); // Mirrors inputSearch and setInputSearch

  // optimization of rerenders
  const handleInputFocus = useCallback(() => setInputExpanded(true), []);
  const handleInputBlur = useCallback(() => setInputExpanded(false), []);

  const debouncedInput = useDebouncedCallback(
    (value) => {
      setInputSearch(value);
    },
    // delay in ms
    1000,
  );

  const handleInputSearch = (inputValue) => {
    setInputExpanded(true); // Keep input expanded while typing
    setInput(inputValue);
    debouncedInput(inputValue);
  };

  const [inputExpanded, setInputExpanded] = useState(false); // Control input expansion state

  // const handleSearchClick = () => {
  //   setInputExpanded((prev) => !prev); // Expand input when clicked
  // };

  //the old useEffect was not particularly useful
  useEffect(() => {
    return () => {
       debouncedInput.cancel(); // stop debounce when unmount
    }
  }, [debouncedInput])

  return (
    <Navbar id="header">
      <Container className=" flex lg:flex-row flex-col  justify-center items-center  w-full px-4">
        <Navbar.Brand href="/" className="d-none d-sm-block ">
          {theme.mode === "light" ? (
            <img src={logo_white} alt="Logo" className="w-24 h-24"></img>
          ) : (
            <img src={logo} alt="Logo" className="w-24 h-24"></img>
          )}
        </Navbar.Brand>

        <div className="flex justify-around items-center gap-11 w-full">
          <label
            className={`${
              theme.mode === "light" ? "bg-slate-200" : "bg-slate-500"
            }  flex rounded-3xl p-2 h-11 w-full md:w-[40rem]`}
          >
            <CustomSelect
              theme={theme} // Correctly pass theme directly
              language={language} // Correctly pass language
              setLanguage={setLanguage} // Correctly pass setLanguage
            />
            {/* Project Search Bar */}
            <input
              type="text"
              className={`transition-all h-7 ml-2 border-solid border-l-2 border-l-violet-950 pl-2 duration-1000 ease-in-out focus:outline-none outline-none ${
                inputExpanded
                  ? "w-1/2 pl-5 border-b-slate-300 border-b-2 border-solid"
                  : "w-1/2"
              } bg-transparent  ${
                theme.mode === "dark"
                  ? "opacity-100 text-slate-200"
                  : "opacity-70 text-slate-800"
              }`}
              placeholder="Search"
              autoComplete="off"
              onMouseEnter={() => setInputExpanded(true)} // Extra renders are minimal, unlike handleSearchClick
              onMouseLeave={() => setInputExpanded(false)}
              onChange={(e) => handleInputSearch(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </label>
          <div
            onClick={changeTheme}
            className={
              "cursor-pointer max-lg:!hidden hover:scale-105 transition-all ease-linear duration-200"
            }
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
