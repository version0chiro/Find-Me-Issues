import React, { useContext, useState } from "react";
import { Container, Pagination } from "react-bootstrap";

import Filter from "./Buttons/Filter";
import Sort from "./Buttons/Sort";
//Context
import { ThemeContext } from "../Context/themeContext";
import "./Navigation.css";
import Darkmode from "./Buttons/Darkmode";

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
  removePagination,
}) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  let paginationItems = [];
  const [selectedPage, setSelectedPage] = useState();
  if (pageNumber <= 3) pushItems(1, 5); // First 3 pages
  else if (maxPageNumber - 2 <= pageNumber)
    pushItems(maxPageNumber - 4, maxPageNumber); // Last 3 pages
  else pushItems(pageNumber - 2, pageNumber + 2); // Other Pages

  // Pushes items i to j (inclusive) to paginationItems
  function pushItems(i, j) {
    for (let idx = i; idx <= j; idx++) {
      paginationItems.push(
        <div
          className={`hover:scale-105 transition-all ease-linear duration-200 cursor-pointer rounded-full w-5 h-5 flex justify-center items-center p-1 ${
            selectedPage === idx
              ? "text-black bg-[#d9d9d9] font-bold scale-125"
              : "text-black bg-white "
          } `}
          key={idx}
          active={idx === pageNumber}
          onClick={() => {
            setPageNumber(idx);
            setSelectedPage(idx);
          }}
        >
          {idx}
        </div>
      );
    }
  }

  return (
    !hidePagination && (
      <Container variant={theme.mode} className="nav ">
        {removePagination ? null : (
          <>
            {/* <ControlPages></ControlPages> */}
            <div className="flex justify-center items-center gap-2 mb-20">
              <div
                onClick={() => {
                  setPageNumber(1);
                }}
                className={`cursor-pointer hover:scale-105 transition-all ease-linear duration-200 w-9 h-9 ${
                  theme.mode === "light" ? "bg-black" : "bg-white"
                } rounded-full flex justify-center items-center`}
              >
                <div
                  className={`w-5 h-5 border-r-4 border-b-4  rotate-[130deg] ${
                    theme.mode === "light" ? "border-white" : "border-black"
                  } `}
                ></div>
              </div>

              {paginationItems}

              <div
                onClick={() => {
                  setPageNumber(maxPageNumber);
                }}
                className={`cursor-pointer hover:scale-105 transition-all ease-linear duration-200 w-9 h-9 ${
                  theme.mode === "light" ? "bg-black" : "bg-white"
                } rounded-full flex justify-center items-center`}
              >
                <div
                  className={`w-5 h-5 border-l-4 border-t-4 rotate-[130deg] ${
                    theme.mode === "light" ? "border-white" : "border-black"
                  }`}
                ></div>
              </div>
            </div>
          </>
        )}

        {hasFilters && (
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row ">
            <div className="flex gap-[1px]">
              <Filter
                reducedState={reducedState}
                setReducedState={setReducedState}
              />
              <Sort
                setSortByStars={setSortByStars}
                setSortByForks={setSortByForks}
              />
            </div>
            <div
              onClick={changeTheme}
              className={
                "cursor-pointer sm:ml-10 max-lg:!block hidden hover:scale-105 transition-all ease-linear duration-200"
              }
              style={{ fontSize: "1.5rem" }}
              aria-hidden="true"
            >
              <Darkmode />
            </div>
          </div>
        )}
      </Container>
    )
  );
};

export default Navigation;
