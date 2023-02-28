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

	// const handleSortByStars = () => {
	// 	props.setSortByForks("");
	// 	if (props.sortByStars === "desc") props.setSortByStars("asc");
	// 	else props.setSortByStars("desc");
	// };

	const handleSortByStarsAsc = () => {
		props.setSortByForks("");
		props.setSortByStars("asc");
	};

	const handleSortByStarsDesc = () => {
		props.setSortByForks("");
		props.setSortByStars("desc");
	};

	const handleSortByForksAsc = () => {
		props.setSortByStars("");
		props.setSortByForks("asc");
	};

	const handleSortByForksDesc = () => {
		props.setSortByStars("");
		props.setSortByForks("desc");
	};

	// const handleSortByForks = () => {
	// 	props.setSortByStars("");
	// 	if (props.sortByForks === "desc") props.setSortByForks("asc");
	// 	else props.setSortByForks("desc");
	// };

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

				<Button size="sm"
					style={{
						margin: "0px 3px",
						display: 'flex'
					}}
				// onClick={handleSortByStars}
				>
					Sort by stars
					<span
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}

					>
						<i className="fa fa-angle-up" aria-hidden="true"
							style={{ margin: '0 5px', fontSize: '15px' }}
							onClick={() => handleSortByStarsAsc()}
						></i>
						<i className="fa fa-angle-down" aria-hidden="true"
							style={{
								margin: '0 5px',
								marginTop: '-5px',
								fontSize: '15px'
							}}
							onClick={() => handleSortByStarsDesc()}
						></i>
					</span>

				</Button>
				<Button size="sm"
					style={{
						margin: "0px 3px",
						display: 'flex'
					}}
					// onClick={handleSortByForks}
				>
					Sort by forks
					<span
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}

					>
						<i className="fa fa-angle-up" aria-hidden="true"
							style={{ margin: '0 5px', fontSize: '15px' }}
							onClick={() => handleSortByForksAsc()}
						></i>
						<i className="fa fa-angle-down" aria-hidden="true"
							style={{
								margin: '0 5px',
								marginTop: '-5px',
								fontSize: '15px'
							}}
							onClick={() => handleSortByForksDesc()}
						></i>
					</span>
				</Button>


				<span className="ml-2 mr-1">Find specific content in the project description: </span>
				<input
					type="text"
					value={inputSearch}
					placeholder="Search"
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
