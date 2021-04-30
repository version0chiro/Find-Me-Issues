import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import langugagesData from "../data/langugage.json";

const Header = (props) => {
  const [language, setLanguage] = useState("javascript");

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>

        <Nav className="mr-auto"></Nav>
        <Form inline>
          <div id="outlined-basic" className="mr-sm-2">{language}</div>

          <NavDropdown title="Select Language" id="basic-nav-dropdown">
            {langugagesData.languages.map((lang, index) => {
              return (
                <div>
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
          </NavDropdown>
        </Form>
      </Navbar>
    </div>
  );
};

export default Header;
