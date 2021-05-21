import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
//Context
import {ThemeContext} from '../Context/themeContext'

const Header = (props) => {
  const [language, setLanguage] = useState("javascript");
  const {theme, changeTheme} = useContext(ThemeContext)

  return (
    <div style={{color: theme.color}}>
      <Navbar bg={theme.mode} variant={theme.mode} expand="lg">
        <Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>
        {theme.mode === 'light' ?
            <Button onClick={changeTheme}><i className="fa fa-moon-o" aria-hidden="true"></i></Button>
          : 
            <Button onClick={changeTheme}><i className="fa fa-sun-o" aria-hidden="true"></i></Button>
        }
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <div id="outlined-basic" className="mr-sm-2">{language}</div>

          <NavDropdown title="Select Language" id="basic-nav-dropdown">
            <div style={{height:"400px", overflowY:"auto"}}>
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
          </NavDropdown>
        </Form>
      </Navbar>
    </div>
  );
};

export default Header;
