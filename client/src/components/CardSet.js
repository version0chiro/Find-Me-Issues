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
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('https://api.github.com/search/repositories?q=language:'+props.language+'+good-first-issues:%3E2&page=1&per_page=10')
      .then((response) => response.json())
      .then((data) => setRepositories(data.items));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div key={props.key} className={classes.cardSet}>
      {repositores===undefined && repositores.length<0 ? (
        <div>
          <SingleCard />
        </div>
      ) : (
        repositores.map((repo) => {
          return <SingleCard repo={repo}/>;
        })
      )}
    </div>
  );
};

export default CardSet;
