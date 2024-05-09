import React, { useCallback, useReducer, useState } from "react";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Collapse } from "react-collapse";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Popover,
  Tooltip,
  Container,
} from "react-bootstrap";
import "./Filter.css";

const Filter = ({ reducedState, setReducedState }) => {
  const [show, setShow] = React.useState(false); // Controls Popover

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  function handleReset() {
    setShow(false);
  }

  function handleApply() {
    setShow(false);
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement={"bottom"}
      show={show}
      onToggle={handleToggle}
      rootClose // Close Popover when clicked out
      overlay={
        <Popover className="popover">
          <Container className="popover__container noBuff">
            <Container>Forks</Container>
            <Form.Control
              type="text"
              value={"Val"}
              placeholder="Min"
              // onChange={(e) => handleInputSearch(e.target.value)}
            />
            <Form.Control
              type="text"
              value={"Val"}
              placeholder="Max"
              // onChange={(e) => handleInputSearch(e.target.value)}
            />
          </Container>
          <Container className="popover__container noBuff">
            <Container>Stars</Container>
            <Form.Control
              type="text"
              value={"Val"}
              placeholder="Min"
              // onChange={(e) => handleInputSearch(e.target.value)}
            />
            <Form.Control
              type="text"
              value={"Val"}
              placeholder="Max"
              // onChange={(e) => handleInputSearch(e.target.value)}
            />
          </Container>
          <Container className="popover__container noBuff">
            <Button onClick={() => handleReset()}>Reset</Button>
            <Button onClick={() => handleApply()}>Apply</Button>
          </Container>
        </Popover>
      }
    >
      <Button variant="secondary"> Filter By</Button>
    </OverlayTrigger>
  );
};

export default React.memo(Filter);
