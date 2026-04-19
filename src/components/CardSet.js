import React, { useState, useEffect, useContext } from "react";
import SingleCard from "./SingleCard";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { isEmpty } from "lodash";
import { ThemeContext } from "../Context/themeContext";
import Loading from "./Loading/index";

const useStyles = makeStyles((theme) => ({
  cardSet: {
    margin: "15px",
  },
}));

const CardSet = ({
  language,
  inputSearch,
  pageNumber,
  reducedState,
  sortByStars,
  sortByForks,
  setMaxPageNumber,
  setHidePagination,
}) => {
  const [repositores, setRepositories] = useState([]);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [wasRejected, setWasRejected] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [forksQuery, setForksQuery] = useState("");
  const [starsQuery, setStarsQuery] = useState("");
  const [CardSetLength, setCardSetLength] = useState(0);

  useEffect(() => {
    setCardSetLength(
      document.getElementById("header").getBoundingClientRect().height + "px"
    );
  }, []);

  let baseUrl = `https://api.github.com/search/repositories?q=good-first-issues:>0+language:${language}${
    !isEmpty(inputSearch) ? `:${inputSearch}+in%3Atitle` : ""
  }&page=${pageNumber}&per_page=10`;

  let urlSuffix = "";

  // Apply Filters (FIXED)
  useEffect(() => {
    const onAppliedFilters = () => {
      // 🔹 Forks logic
      if (reducedState.minForks !== "" && reducedState.maxForks === "") {
        setForksQuery(`forks:>=${reducedState.minForks}`);
      } else if (
        reducedState.maxForks !== "" &&
        reducedState.minForks === ""
      ) {
        setForksQuery(`forks:<=${reducedState.maxForks}`);
      } else if (
        reducedState.maxForks !== "" &&
        reducedState.minForks !== ""
      ) {
        setForksQuery(
          `forks:${reducedState.minForks}..${reducedState.maxForks}`
        );
      } else {
        setForksQuery("");
      }

      // 🔹 Stars logic (FIXED HERE)
      if (reducedState.minStars !== "" && reducedState.maxStars === "") {
        setStarsQuery(`stars:>=${reducedState.minStars}`);
      } else if (
        reducedState.maxStars !== "" &&
        reducedState.minStars === ""
      ) {
        setStarsQuery(`stars:<=${reducedState.maxStars}`);
      } else if (
        reducedState.maxStars !== "" &&
        reducedState.minStars !== ""
      ) {
        setStarsQuery(
          `stars:${reducedState.minStars}..${reducedState.maxStars}`
        );
      } else {
        setStarsQuery("");
      }
    };

    onAppliedFilters();
  }, [
    reducedState,
    language,
    inputSearch,
    pageNumber,
    sortByForks,
    sortByStars,
  ]);

  // Sorting
  if (sortByStars === "desc") urlSuffix = "&sort=stars&order=desc";
  else if (sortByStars === "asc") urlSuffix = "&sort=stars&order=asc";
  else if (sortByForks === "desc") urlSuffix = "&sort=forks&order=desc";
  else if (sortByForks === "asc") urlSuffix = "&sort=forks&order=asc";

  // API Call
  useEffect(() => {
    let finalUrl = baseUrl;

    if (forksQuery !== "") {
      const urlSplits = finalUrl.split("?q=");
      finalUrl = urlSplits[0] + "?q=" + forksQuery + "+" + urlSplits[1];
    }

    if (starsQuery !== "") {
      const urlSplits = finalUrl.split("?q=");
      finalUrl = urlSplits[0] + "?q=" + starsQuery + "+" + urlSplits[1];
    }

    finalUrl += urlSuffix;

    console.log(finalUrl);
    setIsLoading(true);

    axios
      .get(finalUrl)
      .then((response) => {
        let maxPageNumber = Math.floor(response.data.total_count / 10);
        setMaxPageNumber(maxPageNumber);
        setRepositories(response.data.items);
        setWasRejected(false);
        setIsLoading(false);
        response.data.items.length
          ? setHidePagination(false)
          : setHidePagination(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setWasRejected(true);
          setHidePagination(true);
        }
        setIsLoading(false);
      });
  }, [
    baseUrl,
    forksQuery,
    starsQuery,
    urlSuffix,
    setMaxPageNumber,
    setHidePagination,
  ]);

  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundColor: theme.bg,
        color: theme.color,
        minHeight: `calc(100vh - ${CardSetLength})`,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {isEmpty(repositores) ? (
            <div>
              <h5>
                No issues to be shown at the moment, please try again later.
              </h5>
            </div>
          ) : (
            repositores.map((repo) => (
              <SingleCard key={repo.id} repo={repo} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CardSet;