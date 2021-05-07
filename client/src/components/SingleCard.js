import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Emoji from "react-emoji-render";
import backg from '../git9.jpg';

const SingleCard = (props) => {
  console.log(props.repo.repository_url);
  const [repo, setRepo] = useState(null);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(props.repo.repository_url)
      .then((response) => response.json())
      .then((data) => setRepo(data))
      .catch((error) => console.log(error));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props.repo.repository_url]);

  const [openIssues, setOpen] = useState(false);
  return (
    <div classname="" style={{ width: "100%", margin: "10px", padding: "10px" }}>
      {repo === null || repo === undefined ? (
        <div></div>
      ) : (
        <Card className="container container-fluid bg-dark text-white" border="info" style={{ borderRadius:"1rem", borderWidth:"0.2rem"}}>
        <Card.Img src={backg} alt="Card image" style={{height:"330px"}}/>
        <Card.ImgOverlay>
          <div style={{ display: "inline-block" }}>
              <Avatar
                style={{ display: "inline-block" }}
                src={repo.owner.avatar_url}
              />
              <Card.Title>{repo.name}</Card.Title>
            </div>
            <Card.Text>
              {" "}

              {repo.description? <Emoji text={repo.description} />: <></>}

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
      )}
    </div>
  );
};

export default SingleCard;
