import { Card, Button } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";

const SingleCard = (props) => {
  return (
    <div>
      <Card style={{ width: "100%", margin: "10px",padding: "10px"}}>
        <Card.Body>
          <div style={{display: "inline-block"}}>
            <Avatar  style={{display: "inline-block"}} src={props.repo.owner.avatar_url} />
            <Card.Title >{props.repo.name}</Card.Title>
          </div>
          <Card.Text>{props.repo.description}</Card.Text>
          <Card.Text>Total Number of Issues {props.repo.open_issues_count}</Card.Text>
          <Card.Text> Language: {props.repo.language}</Card.Text>
          <a href={props.repo.html_url}>
            <Button variant="primary">Go To Issues</Button>
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleCard;
