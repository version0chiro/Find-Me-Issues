import React, { useCallback, useReducer, useState } from "react";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Collapse } from "react-collapse";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const Filter = ({ reducedState, setReducedState }) => {
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  );

  const onApplyClicked = () => {
    setReducedState(state);
    console.log(reducedState);
  };

  const initFilterState = {
    minForks: "",
    maxForks: "",
    minStars: "",
    maxStars: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "MIN_FORKS_ONLY":
        return {
          ...state,
          minForks: action.payload,
        };
      case "MAX_FORKS_ONLY":
        return {
          ...state,
          maxForks: action.payload,
        };
      case "MIN_STARS_ONLY":
        return {
          ...state,
          minStars: action.payload,
        };
      case "MAX_STARS_ONLY":
        return {
          ...state,
          maxStars: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initFilterState);

  return (
    <>
      <DropdownToggle
        aria-expanded={isButtonCollapseOpen}
        onClick={onClick}
        type="button"
      >
        Filter By
      </DropdownToggle>
    </>
  );
};

export default React.memo(Filter);
