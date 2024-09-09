import { Navbar, Dropdown, Container, Form, InputGroup } from "react-bootstrap";
import "./Header.css";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
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
    <Navbar
      variant={theme.mode}
      className={
        theme.mode === "light" ? "header header--dark" : "header header--light"
      }
      id="header"
    >
      {/* Desktop Title */}
      <Navbar.Brand href="#home" className="d-none d-sm-block">
        Find Me Issues
      </Navbar.Brand>

      {/* Mobile Title & Mode Button */}
      <Container className="header__container--mobile noBuff d-sm-none">
        <Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>
        <i
          onClick={changeTheme}
          className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
          style={{ fontSize: "1.5rem" }}
          aria-hidden="true"
        />
      </Container>

      {/* Search & Select Double Bar */}
      <Container className=" noBuff header__searchbars--desktop ">
        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup_icon--left">
            <Container className="noBuff">
              <i className="fa fa-search" aria-hidden="true" />
            </Container>
          </InputGroup.Text>
        </InputGroup.Prepend>

        <Form.Control
          type="text"
          value={input}
          placeholder="Search..."
          onChange={(e) => handleInputSearch(e.target.value)}
          className="header__search--desktop"
        />

        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup_icon--divider">
            <Container className="header__divider">
              <div
                style={{
                  width: "2px",
                  height: "16px",
                  backgroundColor: "lightgray",
                }}
              />
            </Container>
          </InputGroup.Text>
        </InputGroup.Prepend>

        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup_icon--mid">
            <Container className="noBuff">
              <i className="fa fa-code" aria-hidden="true" />
            </Container>
          </InputGroup.Text>
        </InputGroup.Prepend>

        <Dropdown
          defaultValue={language}
          onSelect={(option) => {
            setLanguage(option);
          }}
        >
          <Dropdown.Toggle
            variant="light"
            className="header__dropdown--desktop"
          >
            {language}
          </Dropdown.Toggle>
          <Dropdown.Menu className="header_dropdown">
            {langugagesData.languages
              .filter((lang) => lang !== language)
              .map((lang, index) => {
                return (
                  <Dropdown.Item key={index} eventKey={lang}>
                    {lang}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      {/* Desktop Mode Button */}
      <i
        onClick={changeTheme}
        className={
          "d-none d-sm-block fa " +
          (theme.mode === "light" ? "fa-moon-o" : "fa-sun-o")
        }
        style={{ fontSize: "1.5rem" }}
        aria-hidden="true"
      />
    </Navbar>
  );
};

export default Header;
