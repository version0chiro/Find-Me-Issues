import React, { useState, useEffect, useContext } from "react";
import SingleCard from "./SingleCard";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { isEmpty } from "lodash";
// import { dotenv } from "dotenv";
// dotenv.config();
//Context
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

  let url = `https://api.github.com/search/repositories?q=good-first-issues:>0+language:${language}${
    !isEmpty(inputSearch) ? `:${inputSearch}+in%3Atitle` : ""
  }&page=${pageNumber}&per_page=10`;

  let urlSuffix = "";

  useEffect(() => {
    const onAppliedFilters = () => {
      if (reducedState.minForks !== "" && reducedState.maxForks === "") {
        setForksQuery(`forks:>=${reducedState.minForks}`);
      } else if (reducedState.maxForks !== "" && reducedState.minForks === "") {
        setForksQuery(`forks:<=${reducedState.maxForks}`);
      } else if (reducedState.maxForks !== "" && reducedState.minForks !== "") {
        setForksQuery(
          `forks:${reducedState.minForks}..${reducedState.maxForks}`
        );
      } else {
        setForksQuery("");
      }

      if (forksQuery !== "") {
        const urlSplits = url.split("?q=");
        url = urlSplits[0] + "?q=" + forksQuery + "+" + urlSplits[1];
      }

      if (reducedState.minStars !== "" && reducedState.maxStars === "") {
        setStarsQuery(`stars:>=${reducedState.minForks}`);
      } else if (reducedState.maxStars !== "" && reducedState.minStars === "") {
        setStarsQuery(`stars:<=${reducedState.maxStars}`);
      } else if (reducedState.maxStars !== "" && reducedState.minStars !== "") {
        setStarsQuery(
          `stars:${reducedState.minStars}..${reducedState.maxStars}`
        );
      } else {
        setStarsQuery("");
      }

      if (starsQuery !== "") {
        const urlSplits = url.split("?q=");
        url = urlSplits[0] + "?q=" + starsQuery + "+" + urlSplits[1];
      }
    };

    onAppliedFilters();
  }, [
    language,
    inputSearch,
    pageNumber,
    reducedState,
    sortByForks,
    sortByStars,
    forksQuery,
    starsQuery,
  ]);

  if (sortByStars === "desc") urlSuffix = "&sort=stars&order=desc";
  else if (sortByStars === "asc") urlSuffix = "&sort=stars&order=asc";
  else if (sortByForks === "desc") urlSuffix = "&sort=forks&order=desc";
  else if (sortByForks === "asc") urlSuffix = "&sort=forks&order=asc";

  useEffect(() => {
    // console.log("stars", sortByStars, "forks", sortByForks);
    url += urlSuffix;
    console.log(url);
    setIsLoading(true);
    // GET request using axios inside useEffect React hook
    axios
      .get(url)
      .then(
        async (response) => {
          // console.log(response.data.items);
          let maxPageNumber = Math.floor(response.data.total_count / 10);
          setMaxPageNumber(maxPageNumber);
          setRepositories(response.data.items);
          setWasRejected(false);
          setIsLoading(false);
          response.data.items.length
            ? setHidePagination(false)
            : setHidePagination(true);
        },
        (rejection) => {
          if (rejection.response.status === 403) {
            setWasRejected(true);
            setHidePagination(true);
          }
          // console.log(rejection.response.data)
        }
      )
      .catch((errors) => {
        setIsLoading(false);
        //catch all (show some message)
        //console.log(errors)
      });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [
    language,
    inputSearch,
    pageNumber,
    reducedState,
    sortByForks,
    sortByStars,
    url,
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
        <Loading></Loading>
      ) : (
        <div className={` grid grid-cols-1  lg:grid-cols-3 `}>
          {isEmpty(repositores) ? (
            <div>
              <h5>
                No issues to be shown at the moment, please try again later.
              </h5>
            </div>
          ) : (
            !isEmpty(repositores) &&
            repositores.map((repo) => <SingleCard key={repo.id} repo={repo} />)
          )}
        </div>
      )}
    </div>
  );
};

export default CardSet;
