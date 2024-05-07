import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Button,
} from "react-bootstrap";
// import FormSelect from "react-bootstrap/FormSelect";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
import { useDebouncedCallback } from "use-debounce";
//Context
import { ThemeContext } from "../Context/themeContext";

const Header = (props) => {
  //   const [language, setLanguage] = useState("Javascript");
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
      bg={theme.mode}
      variant={theme.mode}
      id="header"
      style={{ padding: ".5rem" }}
    >
      <Container fluid>
        <Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>
        {/* <Button
          size="sm"
          style={{
            margin: "0px 3px",
          }}
          onClick={handleSortByStars}
        >
          Sort by stars
        </Button>
        <Button
          size="sm"
          style={{
            margin: "0px 3px",
          }}
          onClick={handleSortByForks}
        >
          Sort by forks
        </Button> */}
        {/* <span className="ml-2 mr-1">
          Find specific content in the project description:{" "}
        </span> */}
        <Container style={{ width: "50%", padding: "0", margin: "0" }}>
          <Row style={{ padding: "0", margin: "0" }}>
            <input
              type="text"
              value={inputSearch}
              placeholder="Search Project Descriptions..."
              onChange={(e) => handleInputSearch(e.target.value)}
              style={{
                width: "50%",
              }}
            />
            <Form.Control
              as="select"
              title={props.language}
              id="basic-nav-dropdown"
              style={{
                width: "50%",
                padding: "2px",
              }}
            >
              {langugagesData.languages.map((lang, index) => {
                return (
                  <option
                    key={index}
                    onClick={() => {
                      //   setLanguage(lang);
                      props.setLanguage(lang);
                    }}
                    selected={lang === props.language ? true : false}
                  >
                    {lang}
                  </option>
                );
              })}
            </Form.Control>
          </Row>
        </Container>

        {/* <NavDropdown title={language} id="basic-nav-dropdown">
          <div style={{ height: "400px", overflowY: "auto" }}>
            {langugagesData.languages.map((lang, index) => {
              return (
                <div key={index}>
                  <NavDropdown.Item
                    onClick={() => {
                      setLanguage(lang);
                      props.setLanguage(lang);
                    }}
                  >
                    {lang}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </div>
              );
            })}
          </div>
        </NavDropdown> */}
        <Button onClick={changeTheme} size="sm">
          <i
            className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
            aria-hidden="true"
          />
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
