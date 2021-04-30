import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Animate } from "react-show";

import IssuesList from "./IssuesList.js";

const SingleCard = (props) => {
  console.log(props.repo.repository_url);
  const [repo,setRepo] = useState(null);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(props.repo.repository_url)
      .then((response) => response.json())
      .then((data) => (setRepo(data)))
      .catch((error) => console.log(error));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props.key]);
  const [openIssues, setOpen] = useState(false);
  return (
    <div style={{ width: "100%", margin: "10px", padding: "10px" }}>
      {!repo ? (
        <div></div>
      ) : (
        <Card>
          <Card.Body>
            <div style={{ display: "inline-block" }}>
              <Avatar
                style={{ display: "inline-block" }}
                src={repo.owner.avatar_url}
              />
              <Card.Title>{repo.name}</Card.Title>
            </div>
            <Card.Text>{repo.description}</Card.Text>
            <Card.Text>
              Issue description:
            </Card.Text>
            <Card.Text>
            {props.repo.title}
            </Card.Text>
            <Card.Text> Language: {repo.language}</Card.Text>
            <a href={props.repo.html_url}>
            <Button variant="primary" onClick={() => setOpen(!openIssues)}>
              Go To Issues
            </Button>
            </a>
            {/* <IssuesList openIssues={openIssues} /> */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SingleCard;
