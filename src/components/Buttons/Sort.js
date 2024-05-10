import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const Sort = ({ setSortByForks, setSortByStars }) => {
  // forksdesc, forksasc, starsdesc, starsasc, default
  let [sort, setSort] = useState("default");

  useEffect(() => {
    if (!setSortByForks || !setSortByStars) return;
    switch (sort) {
      case "forksasc":
        setSortByStars("");
        setSortByForks("asc");
        break;
      case "forksdesc":
        setSortByStars("");
        setSortByForks("desc");
        break;
      case "starsasc":
        setSortByForks("");
        setSortByStars("asc");
        break;
      case "starsdesc":
        setSortByForks("");
        setSortByStars("desc");
        break;
      default:
        setSortByForks("desc");
        setSortByStars("desc");
        break;
    }
  }, [sort, setSortByForks, setSortByStars]);

  function getText() {
    switch (sort) {
      case "forksasc":
        return "Forks: Low to High";
      case "forksdesc":
        return "Forks: High to Low";
      case "starsasc":
        return "Stars: Low to High";
      case "starsdesc":
        return "Stars: High to Low";
      default:
        return "Sort ";
    }
  }

  return (
    <Dropdown
      defaultValue={"default"}
      onSelect={(option) => {
        setSort(option);
      }}
    >
      <Dropdown.Toggle variant={sort === "default" ? "light" : "primary"}>
        {getText()}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item key={"default"} eventKey={"default"}>
          None
        </Dropdown.Item>
        <Dropdown.Item key={"forksasc"} eventKey={"forksasc"}>
          Forks: Low to High
        </Dropdown.Item>
        <Dropdown.Item key={"forksdesc"} eventKey={"forksdesc"}>
          Forks: High to Low
        </Dropdown.Item>
        <Dropdown.Item key={"starsasc"} eventKey={"starsasc"}>
          Stars: Low to High
        </Dropdown.Item>
        <Dropdown.Item key={"starsdesc"} eventKey={"starsdesc"}>
          Stars: High to Low
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(Sort);
