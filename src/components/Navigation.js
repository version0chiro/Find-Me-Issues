import React, { useContext } from "react";
import { Container, Pagination } from "react-bootstrap";

import Filter from "./Buttons/Filter";
import Sort from "./Buttons/Sort";
//Context
import { ThemeContext } from "../Context/themeContext";
import "./Navigation.css";

const Navigation = ({
  setPageNumber,
  pageNumber,
  maxPageNumber,
  setSortByForks,
  setSortByStars,
  reducedState,
  setReducedState,
  hidePagination,
  hasFilters,
}) => {
  const { theme } = useContext(ThemeContext);
  let paginationItems = [];

  if (pageNumber <= 3) pushItems(1, 5); // First 3 pages
  else if (maxPageNumber - 2 <= pageNumber)
    pushItems(maxPageNumber - 4, maxPageNumber); // Last 3 pages
  else pushItems(pageNumber - 2, pageNumber + 2); // Other Pages

  // Pushes items i to j (inclusive) to paginationItems
  function pushItems(i, j) {
    for (let idx = i; idx <= j; idx++) {
      paginationItems.push(
        <Pagination.Item
          key={idx}
          active={idx === pageNumber}
          onClick={() => {
            setPageNumber(idx);
          }}
        >
          {idx}
        </Pagination.Item>
      );
    }
  }

  return (
    !hidePagination && (
      <Container variant={theme.mode} className="nav">
        <Pagination className="noBuff">
          <Pagination.First
            onClick={() => {
              setPageNumber(1);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              setPageNumber(Math.max(pageNumber - 5, 1));
            }}
          />

          {paginationItems}

          <Pagination.Next
            onClick={() => {
              setPageNumber(Math.min(pageNumber + 5, maxPageNumber));
            }}
          />
          <Pagination.Last
            onClick={() => {
              setPageNumber(maxPageNumber);
            }}
          />
        </Pagination>
        {hasFilters && (
          <Container className="nav__buttons noBuff">
            <Filter
              reducedState={reducedState}
              setReducedState={setReducedState}
            />
            <Sort
              setSortByStars={setSortByStars}
              setSortByForks={setSortByForks}
            />
          </Container>
        )}
      </Container>
    )
  );
};

export default Navigation;
