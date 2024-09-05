import React, { useContext, useState } from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
//Context
import { ThemeContext } from "./Context/themeContext";
//Components
import Header from "./components/Header";
import CardSet from "./components/CardSet";
import Navigation from "./components/Navigation";

function App() {
  const [language, setLanguage] = useState("Javascript");
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(100);
  const [inputSearch, setInputSearch] = useState("");
  const [sortByForks, setSortByForks] = useState("desc");
  const [sortByStars, setSortByStars] = useState("desc");
  const [reducedState, setReducedState] = useState({
    minForks: "",
    maxForks: "",
    minStars: "",
    maxStars: "",
  });
  const [hidePagination, setHidePagination] = useState(true);

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="App"
      style={{ backgroundColor: theme.bg, color: theme.color }}
    >
      <Header
        language={language}
        setLanguage={setLanguage}
        setInputSearch={setInputSearch}
      />

      <Navigation
        pageNumber={pageNumber}
        maxPageNumber={maxPageNumber}
        setPageNumber={setPageNumber}
        setSortByForks={setSortByForks}
        setSortByStars={setSortByStars}
        reducedState={reducedState}
        setReducedState={setReducedState}
        hidePagination={hidePagination}
        removePagination={true}
        hasFilters
      />

      <CardSet
        pageNumber={pageNumber}
        language={language}
        key={language + pageNumber}
        setMaxPageNumber={setMaxPageNumber}
        sortByForks={sortByForks}
        sortByStars={sortByStars}
        reducedState={reducedState}
        setReducedState={setReducedState}
        inputSearch={inputSearch}
        setHidePagination={setHidePagination}
      />
      <Navigation
        pageNumber={pageNumber}
        maxPageNumber={maxPageNumber}
        setPageNumber={setPageNumber}
        setSortByForks={setSortByForks}
        setSortByStars={setSortByStars}
        reducedState={reducedState}
        setReducedState={setReducedState}
        hidePagination={hidePagination}
      />
    </div>
  );
}

export default App;
