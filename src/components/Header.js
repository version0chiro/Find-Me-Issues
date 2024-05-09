import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  Container,
  Form,
  InputGroup,
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
    <Navbar
      //   bg={theme.mode}
      variant={theme.mode}
      className={theme.mode === "light" ? "navbar--dark" : "navbar--light"}
      id="header"
    >
      {/* Desktop Title */}
      <Navbar.Brand href="#home" className="d-none d-sm-block">
        Find Me Issues
      </Navbar.Brand>

      {/* Mobile Title & Mode Button */}
      <Container className="navbar__container--mobile noBuff d-sm-none">
        <Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>
        <i
          onClick={changeTheme}
          className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
          style={{ fontSize: "1.5rem" }}
          aria-hidden="true"
        />
      </Container>

      {/* Search & Select Double Bar */}
      <Container className=" noBuff navbar__searchbars--desktop ">
        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup_icon--left">
            <Container className="noBuff">
              <i className="fa fa-search" aria-hidden="true" />
            </Container>
          </InputGroup.Text>
        </InputGroup.Prepend>

        <Form.Control
          type="text"
          value={inputSearch}
          placeholder="Search..."
          onChange={(e) => handleInputSearch(e.target.value)}
          className="navbar__search--desktop"
        />

        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup_icon--divider">
            <Container className="navbar__divider">
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
          defaultValue={props.language}
          onSelect={(option) => {
            props.setLanguage(option);
          }}
        >
          <Dropdown.Toggle
            variant="light"
            className="navbar__dropdown--desktop"
          >
            {props.language}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {langugagesData.languages.map((lang, index) => {
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
