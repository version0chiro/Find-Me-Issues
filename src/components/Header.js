import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import "./Header.css";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
import { useDebouncedCallback } from "use-debounce";
//Context
import { ThemeContext } from "../Context/themeContext";

const Header = (props) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [inputSearch, setInputSearch] = useState("");

  const debouncedInput = useDebouncedCallback(
    (value) => {
      props.setInputSearch(value);
    },
    // delay in ms
    1000
  );

  const handleInputSearch = (inputValue) => {
    setInputSearch(inputValue);
    debouncedInput(inputValue);
  };

  const handleSortByStars = () => {
    props.setSortByForks("");
    if (props.sortByStars === "desc") props.setSortByStars("asc");
    else props.setSortByStars("desc");
  };
  const handleSortByForks = () => {
    props.setSortByStars("");
    if (props.sortByForks === "desc") props.setSortByForks("asc");
    else props.setSortByForks("desc");
  };

  return (
    <Navbar bg={theme.mode} variant={theme.mode} className="navbar" id="header">
      <Navbar.Brand href="#home" className="navbar__brand d-none d-sm-block">
        Find Me Issues
      </Navbar.Brand>

      <Container className="navbar__container--mobile d-sm-none">
        <Navbar.Brand href="#home" className="navbar__brand">
          Find Me Issues
        </Navbar.Brand>
        <Button onClick={changeTheme} size="sm">
          <i
            className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
            aria-hidden="true"
          />
        </Button>
      </Container>

      <Container className="navbar__searchbars--desktop d-none d-sm-block">
        <Row>
          <input
            type="text"
            value={inputSearch}
            placeholder="Search..."
            onChange={(e) => handleInputSearch(e.target.value)}
            className="navbar__search"
          />
          <Form.Control
            as="select"
            title={props.language}
            id="basic-nav-dropdown"
            defaultValue={props.language}
            className="navbar__lang"
          >
            {langugagesData.languages.map((lang, index) => {
              return (
                <option
                  key={index}
                  onClick={() => {
                    props.setLanguage(lang);
                  }}
                >
                  {lang}
                </option>
              );
            })}
          </Form.Control>
        </Row>
      </Container>

      <input
        type="text"
        value={inputSearch}
        placeholder="Search..."
        onChange={(e) => handleInputSearch(e.target.value)}
        className="navbar__search d-sm-none"
      />
      <Form.Control
        as="select"
        title={props.language}
        id="basic-nav-dropdown"
        defaultValue={props.language}
        className="navbar__lang d-sm-none"
      >
        {langugagesData.languages.map((lang, index) => {
          return (
            <option
              key={index}
              onClick={() => {
                props.setLanguage(lang);
              }}
            >
              {lang}
            </option>
          );
        })}
      </Form.Control>

      <Button onClick={changeTheme} size="sm" className="d-none d-sm-block">
        <i
          className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
          aria-hidden="true"
        />
      </Button>
    </Navbar>
  );
};

export default Header;
