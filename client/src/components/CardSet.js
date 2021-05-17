import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardSet: {
    margin: "15px",
  },
}));

const CardSet = (props) => {
  const [repositores, setRepositories] = useState([]);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // GET request using fetch inside useEffect React hook

    fetch(
      `https://api.github.com/search/issues?q=state:open+label:good-first-issue+language:${props.language}&page=${props.pageNumber}&per_page=10`
    )
      .then((response) => response.json())
      .then((data) => {
        let maxPageNumber = Math.floor(data.total_count / 10);
        props.setMaxPageNumber(maxPageNumber);
        console.log(maxPageNumber);
        setRepositories(data.items);
        setIsLoading(false)
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props]);


  return (
    <>
      {isLoading ? 
      <div className="loader-container">
        <div className="loader"></div>
        <h5>Fetching some good first issues for you...</h5>
      </div> 
      :
      <div key={props.key} className={classes.cardSet}>
        {repositores === undefined || repositores.length < 0 ? (
          <div>
            <SingleCard />
          </div>
        ) : (
          repositores.map((repo) => {
            return <SingleCard key={props.key} repo={repo} />;
          })
        )}
      </div>
      }
    </>
  );
};

export default CardSet;
