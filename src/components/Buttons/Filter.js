import React from "react";
import {
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Container,
} from "react-bootstrap";
import "./Filter.css";

const Filter = ({ reducedState, setReducedState }) => {
  const [show, setShow] = React.useState(false); // Controls Popover
  const [filters, setFilters] = React.useState(reducedState);

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  function updateFilters(prop, val) {
    setFilters((prev) => ({
      ...prev,
      [prop]: val, // Update the specific property
    }));
  }

  function handleReset() {
    setFilters({
      minForks: "",
      maxForks: "",
      minStars: "",
      maxStars: "",
    });
    setReducedState({ ...filters });
  }

  function handleApply() {
    setShow(false);
    setReducedState({ ...filters });
  }

  function isEmpty() {
    for (let key in filters) {
      if (filters[key] !== "") return false;
      return true;
    }
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement={"bottom"}
      show={show}
      onToggle={handleToggle}
      rootClose // Close Popover when clicked out
      popperConfig={{
        modifiers: {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      }} // PopOver Offset
      overlay={
        <Popover className="popover">
          <Container className="popover__container noBuff">
            <Container className="popover__text">Forks</Container>
            <Container className="popover__inputs noBuff">
              <Form.Control
                type="number"
                value={filters?.minForks || ""}
                placeholder="Min"
                onChange={(e) => updateFilters("minForks", e.target.value)}
                className="popover__input"
              />
              <Form.Control
                type="number"
                value={filters?.maxForks || ""}
                placeholder="Max"
                onChange={(e) => updateFilters("maxForks", e.target.value)}
                className="popover__input"
              />
            </Container>
          </Container>
          <Container className="popover__container noBuff">
            <Container className="popover__text">Stars</Container>
            <Container className="popover__inputs noBuff">
              <Form.Control
                type="number"
                value={filters?.minStars || ""}
                placeholder="Min"
                onChange={(e) => updateFilters("minStars", e.target.value)}
                className="popover_start"
              />
              <Form.Control
                type="number"
                value={filters?.maxStars || ""}
                placeholder="Max"
                onChange={(e) => updateFilters("maxStars", e.target.value)}
                className="popover_start"
              />
            </Container>
          </Container>
          <Container className="popover__buttons noBuff">
            <Button variant="secondary" onClick={() => handleReset()}>
              Reset
            </Button>
            <Button onClick={() => handleApply()}>Apply</Button>
          </Container>
        </Popover>
      }
    >
      <Button variant={isEmpty() ? "light" : "primary"}> Filter </Button>
    </OverlayTrigger>
  );
};

export default React.memo(Filter);
