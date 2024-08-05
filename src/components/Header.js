import { Navbar, Container } from "react-bootstrap";
import "./Header.css";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
import logo from "./../logo.png";
import logo_white from "./../logo-white.png";
import { useDebouncedCallback } from "use-debounce";
//Context
import { ThemeContext } from "../Context/themeContext";

const Header = ({ language, setLanguage, setInputSearch }) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [input, setInput] = useState(""); // Mirrors inputSearch and setInputSearch

  const debouncedInput = useDebouncedCallback(
    (value) => {
      setInputSearch(value);
    },
    // delay in ms
    1000
  );

  const handleInputSearch = (inputValue) => {
    setInput(inputValue);
    debouncedInput(inputValue);
  };

  return (
    <Navbar id="header">
      <Container className=" flex lg:flex-row flex-col  justify-center items-center  w-full px-4">
        <Navbar.Brand href="#home" className="d-none d-sm-block ">
          {theme.color === "light" ? (
            <img src={logo_white} alt="Logo" className="w-24 h-24"></img>
          ) : (
            <img src={logo} alt="Logo" className="w-24 h-24"></img>
          )}
        </Navbar.Brand>

        <div className="flex justify-center items-center gap-11 w-full">
          <label
            className={`${
              theme.mode === "light" ? "bg-slate-200" : "bg-white"
            }  flex rounded-3xl p-2 h-11 md:w-[40rem] `}
          >
            <select
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm text-black outline-none bg-transparent rounded-md "
            >
              <option disabled>Escolha uma opção</option>
              {langugagesData.languages
                .filter((lang) => lang !== language)
                .map((lang, index) => {
                  return (
                    <option
                      className=" p-1 rounded-md"
                      key={index}
                      value={lang}
                    >
                      {lang}
                    </option>
                  );
                })}
            </select>
            <input
              className="outline-transparent bg-transparent text-black border-l-2 border-black ml-2 pl-2"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                handleInputSearch(e.target.value);
              }}
            ></input>
          </label>

          <i
            onClick={changeTheme}
            className={
              "cursor-pointer hover:scale-105 transition-all ease-linear duration-200" +
              "d-none d-sm-block fa " +
              (theme.mode === "light" ? "fa-moon-o" : "fa-sun-o")
            }
            style={{ fontSize: "1.5rem" }}
            aria-hidden="true"
          />
        </div>
      </Container>

      {/* Desktop Mode Button */}
    </Navbar>
  );
};

export default Header;
