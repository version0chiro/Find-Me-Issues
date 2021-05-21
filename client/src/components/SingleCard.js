import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Emoji from "react-emoji-render";
import backg from '../git9.jpg';
import axios from 'axios'
import {isEmpty} from 'lodash'

const SingleCard = (props) => {
  //console.log(props.repo.repository_url)
  const [repo, setRepo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // GET request using axios inside useEffect React hook
    axios.get(props.repo.repository_url)
      .then(response => {
        setWasRejected(false)
        setIsLoading(false)
        setRepo(response.data)
      }, rejection => {
        if(rejection.response.status === 403) setWasRejected(true)
        //console.log(rejection.response.data)
      })
      .catch(errors => {
        setIsLoading(false)
        //console.log(errors)
      })
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props.repo.repository_url]);

  const [openIssues, setOpen] = useState(false);
  return (
    <div style={{ width: "100%", margin: "10px", padding: "10px", WebkitTextStroke:"0.4px white" }}>
      {wasRejected && <small style={{color:"red"}}>You are seeing this message because github imposes rate limit on requests. Please refresh the page or wait a couple of minutes.</small>}
      {isLoading ? (
        <div className="loader"></div>
      ) : (
      <> { !isEmpty(repo) &&
        <Card className="container container-fluid bg-dark text-white" border="info" style={{ borderRadius:"1rem", borderWidth:"0.2rem"}}>
        <Card.Img src={backg} alt="Card image" style={{height:"330px"}}/>
        <Card.ImgOverlay>
          <div style={{ display: "inline-block", borderColor:"white", borderWidth:"0.2rem" }}>
              <Avatar
                style={{ display: "inline-block", border: '1.5px solid lightgray' }}
                src={repo.owner.avatar_url}
              />
              <Card.Title>{repo.name}</Card.Title>
            </div>
            <Card.Text>
              {" "}

              {repo.description? <span style={{ WebkitTextStroke:"0.4px white" }}><Emoji text={repo.description} /> </span>: <></>}

            </Card.Text>
            <Card.Text>Issue description:</Card.Text>
            <Card.Text>{props.repo.title}</Card.Text>
            <Card.Text> Language: {repo.language}</Card.Text>
            <a href={props.repo.html_url}>
              <Button variant="outline-info" onClick={() => setOpen(!openIssues)}>
                Go To Issues
              </Button>
            </a>
        </Card.ImgOverlay>
      </Card>
      } </>
      )}
    </div>
  );
};

export default SingleCard;
