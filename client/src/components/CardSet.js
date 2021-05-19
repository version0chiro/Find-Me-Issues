import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {isEmpty} from 'lodash'


const useStyles = makeStyles((theme) => ({
  cardSet: {
    margin: "15px",
  },
}));

const CardSet = (props) => {
  const [repositores, setRepositories] = useState([]);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)
  const url = `https://api.github.com/search/issues?q=state:open+label:good-first-issue+language:${props.language}&page=${props.pageNumber}&per_page=10`

  useEffect(() => {
    setIsLoading(true)
    // GET request using axios inside useEffect React hook
    axios.get(url)
      .then(response => {
        let maxPageNumber = Math.floor(response.data.total_count / 10);
        props.setMaxPageNumber(maxPageNumber);
        setRepositories(response.data.items);
        setWasRejected(false)
        setIsLoading(false)
      }, rejection => {
        if(rejection.response.status === 403) setWasRejected(true)
        //console.log(rejection.response.data)
      })
      .catch(errors => {
        setIsLoading(false)
        //catch all (show some message)
        //console.log(errors)
      })
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props, url]);


  return (
    <>
      {isLoading ? 
      <div className="loader-container">
        <div className="loader"></div>
        <h5>Fetching some good first issues for you...</h5>
        {wasRejected && <h5 style={{color:"red"}}>You are seeing this message because github imposes rate limit on requests. Please refresh the page or wait a couple of minutes.</h5>}
      </div> 
      :
      <div className={classes.cardSet}>
        {isEmpty(repositores) ? (
          <div>
            <h5>No issues to be shown at the moment, please try again later.</h5>
          </div>
        ) : (
          !isEmpty(repositores) && repositores.map((repo) => (<SingleCard key={repo.id} repo={repo} />))
        )}
      </div>
      }
    </>
  );
};

export default CardSet;
