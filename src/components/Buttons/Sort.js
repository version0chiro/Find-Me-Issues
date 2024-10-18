import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../Context/themeContext";

const Sort = ({ setSortByForks, setSortByStars }) => {
  const { theme } = useContext(ThemeContext);

  // forksdesc, forksasc, starsdesc, starsasc, default
  let [sort, setSort] = useState("default");
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
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

  // Close Sort Filter when clicking outside
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
          className={`gap-2   cursor-pointer hover:scale-105 transition-all duration-200 w-40 h-11 rounded-r-2xl ${
            theme.mode === "light"
              ? "bg-slate-200 text-black"
              : "bg-white text-black"
          }   flex justify-center items-center`}
        >
          <span>Sort</span>
          <div className="w-2 h-2 border-b-[3px] border-r-[3px] border-black rotate-[45deg]"></div>
        </div>
        {show ? (
          <div className="z-20 py-2 gap-2 absolute text-black top-12 bg-slate-200 w-40 rounded-2xl flex flex-col justify-center items-center">
            <span className="text-md font-bold">Forks</span>
            <div className="flex flex-col">
              <span
                onClick={() => {
                  setSort("forksasc");
                  setShow(false);
                }}
                className="text-slate-600 cursor-pointer hover:scale-105 transition-all duration-200 hover:font-bold flex gap-2 justify-center items-center text-sm"
              >
                Low to High
                <div
                  className={`rounded-full w-4 h-4 border-[1px] border-black ${
                    sort === "forksasc"
                      ? "bg-green-500 border-none "
                      : "bg-none"
                  }`}
                ></div>
              </span>
              <span
                onClick={() => {
                  setSort("forksdesc");
                  setShow(false);
                }}
                className="text-slate-600 cursor-pointer hover:scale-105 transition-all duration-200 hover:font-bold flex gap-2 justify-center items-center text-sm"
              >
                High to Low
                <div
                  className={`rounded-full w-4 h-4 border-[1px] border-black ${
                    sort === "forksdesc"
                      ? "bg-green-500 border-none"
                      : "bg-none"
                  }`}
                ></div>
              </span>
            </div>
            <span className="text-md font-bold">Stars</span>
            <div className="flex flex-col">
              <span
                onClick={() => {
                  setSort("starsasc");
                  setShow(false);
                }}
                className="text-slate-600 cursor-pointer hover:scale-105 transition-all duration-200 hover:font-bold flex gap-2 justify-center items-center text-sm"
              >
                Low to High
                <div
                  className={`rounded-full w-4 h-4 border-[1px] border-black ${
                    sort === "starsasc" ? "bg-green-500 border-none" : "bg-none"
                  }`}
                ></div>
              </span>
              <span
                onClick={() => {
                  setSort("starsdesc");
                  setShow(false);
                }}
                className="text-slate-600 cursor-pointer hover:scale-105 transition-all duration-200 hover:font-bold flex gap-2 justify-center items-center text-sm"
              >
                High to Low
                <div
                  className={`rounded-full w-4 h-4 border-[1px] border-black ${
                    sort === "starsdesc"
                      ? "bg-green-500 border-none"
                      : "bg-none"
                  }`}
                ></div>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default React.memo(Sort);
