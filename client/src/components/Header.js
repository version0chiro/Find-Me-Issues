import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import langugagesData from "../data/langugage.json";

const Header = (props) => {
  const [language, setLanguage] = useState("javascript");

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {langugagesData.languages.map((lang,index) => {
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
          </Nav>
          <Form inline>
            <FormControl
              value={language}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
