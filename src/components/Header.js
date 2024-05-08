import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  InputGroup,
  Row,
  Button,
} from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
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
      <Navbar.Brand href="#home" className="navbar__brand d-none d-sm-block">
        Find Me Issues
      </Navbar.Brand>

      {/* Mobile Title & Mode Button */}
      <Container className="navbar__container--mobile noBuff d-sm-none">
        <Navbar.Brand href="#home" className="navbar__brand">
          Find Me Issues
        </Navbar.Brand>
        <i
          onClick={changeTheme}
          className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
          style={{ fontSize: "1.5rem" }}
          aria-hidden="true"
        />
      </Container>

      {/* Desktop Search & Select Double Bar */}
      <Container className="navbar__searchbars--desktop d-none d-sm-flex">
        <InputGroup>
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
        </InputGroup>

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

        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="inputgroup_icon--mid">
              <Container className="noBuff">
                <i className="fa fa-code" aria-hidden="true" />
              </Container>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            defaultValue={props.language}
            title={props.language}
            id="basic-nav-dropdown"
            className="navbar__select--desktop"
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
        </InputGroup>
      </Container>

      {/* Mobile Search Bar */}
      <InputGroup className="d-sm-none">
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
          className="navbar__search--mobile"
        />
      </InputGroup>

      {/* Mobile Select Bar */}
      <InputGroup className="d-sm-none" style={{ paddingTop: "3px" }}>
        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup_icon--left">
            <Container className="noBuff">
              <i className="fa fa-code" aria-hidden="true" />
            </Container>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          defaultValue={props.language}
          title={props.language}
          id="basic-nav-dropdown"
          className="navbar__select--mobile"
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
      </InputGroup>

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
