import React, { useContext, useEffect, useRef } from "react";

import "./Filter.css";
import { ThemeContext } from "../../Context/themeContext";

const Filter = ({ reducedState, setReducedState }) => {
  const [show, setShow] = React.useState(false); // Controls Popover
  const [filters, setFilters] = React.useState(reducedState);
  const { theme } = useContext(ThemeContext);
  const dropdownRef = useRef(null);
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => {
            setShow(!show);
          }}
          className={`gap-2   cursor-pointer hover:scale-105 transition-all duration-200 w-40 h-11 rounded-l-2xl ${
            theme.mode === "light"
              ? "bg-slate-200 text-black"
              : "bg-white text-black"
          }   flex justify-center items-center`}
        >
          <span>Filter</span>
          <div className="w-2 h-2 border-b-[3px] border-r-[3px] border-black rotate-[45deg]"></div>
        </div>
        {show ? (
          <>
            <div className="z-20 py-2 gap-2 absolute text-black top-12 right-0 bg-slate-200 w-40 rounded-2xl flex flex-col justify-center items-center">
              <span className="text-md font-bold">Forks</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-12 h-6 p-2 text-sm rounded-md border-[1px] border-black"
                  onChange={(e) => updateFilters("minForks", e.target.value)}
                ></input>
                -
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => updateFilters("maxForks", e.target.value)}
                  className="w-12 h-6 p-2 text-sm rounded-md border-[1px] border-black"
                ></input>
              </div>
              <span className="text-md font-bold">Stars</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-12 h-6 p-2 text-sm rounded-md border-[1px] border-black"
                  onChange={(e) => updateFilters("minStars", e.target.value)}
                ></input>
                -
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => updateFilters("maxStars", e.target.value)}
                  className="w-12 h-6 p-2 text-sm rounded-md border-[1px] border-black"
                ></input>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    handleReset();
                    setShow(!show);
                  }}
                  className="hover:scale-105 transition-all ease-linear duration-200 rounded-md px-2 py-1 text-white bg-black"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    handleApply();
                    setShow(!show);
                  }}
                  className="hover:scale-105 transition-all ease-linear duration-200 rounded-md px-2 py-1 text-white bg-[#0373A1]"
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default React.memo(Filter);
