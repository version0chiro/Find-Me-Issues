import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
import { useDebouncedCallback } from "use-debounce";
//Context
import { ThemeContext } from "../Context/themeContext";

const Header = (props) => {
	const [language, setLanguage] = useState("javascript");
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

	const handleSortByStarsdec = () => {
		props.setSortByForks("");
		props.setSortByStars("desc");
	};
	const handleSortByStarsacc = () => {
		props.setSortByForks("");
		props.setSortByStars("asc");
	};
	const handleSortByForksacc = () => {
		props.setSortByStars("");
		props.setSortByForks("asc");
	};
	const handleSortByForksdec = () => {
		props.setSortByStars("");
		props.setSortByForks("desc");
	};

	return (
			<Navbar bg={theme.mode} variant={theme.mode} expand="lg">
				<Container fluid>
					<Navbar.Brand href="#home">Find Me Issues</Navbar.Brand>
					{theme.mode === "light" ? (
						<Button onClick={changeTheme} size="sm">
							<i className="fa fa-moon-o" aria-hidden="true"></i>
						</Button>
					) : (
						<Button onClick={changeTheme} size="sm">
							<i className="fa fa-sun-o" aria-hidden="true"></i>
						</Button>
					)}
					<Nav className="mr-auto"></Nav>

					{/* <Button size="sm"
						style={{
							margin: "0px 3px",
						}}
						onClick={handleSortByStars}
					>
						Sort by stars
					</Button> */}
					<div class="dropdown">
					<label>
						Sort by stars
					</label>
					<div class="dropdown-content">
						<Button size="sm"
						style={{
							margin: "0px 3px",
						}}
						onClick={handleSortByStarsacc}
						>
						ascending order
						</Button>

						<Button size="sm"
						style={{
							margin: "0px 3px",
						}}
						onClick={handleSortByStarsdec}
						>
						descending order
						</Button>
						</div>
					</div>
					{/* <Button size="sm"
						style={{
							margin: "0px 3px",
						}}
						onClick={handleSortByForks}
					>
						Sort by forks
					</Button> */}
					<div class="dropdown">
					<label>
						Sort by forks
					</label>
					<div class="dropdown-content">
						<Button size="sm"
						style={{
							margin: "0px 3px",
						}}
						onClick={handleSortByForksacc}
						>
						ascending order
						</Button>

						<Button size="sm"
						style={{
							margin: "0px 3px",
						}}
						onClick={handleSortByForksdec}
						>
						descending order
						</Button>
						</div>
					</div>

					<span className="ml-2 mr-1">Find specific content in the project description: </span>
					<input
						type="text"
						value={inputSearch}
						onChange={(e) => handleInputSearch(e.target.value)}
					/>
					<div id="outlined-basic" className="mr-sm-2">
						{language}
					</div>
					<NavDropdown title="Select Language" id="basic-nav-dropdown">
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
					</NavDropdown>
				</Container>

			</Navbar>
	);
};

export default Header;
