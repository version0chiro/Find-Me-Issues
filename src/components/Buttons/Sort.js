import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Context/themeContext";

const Sort = ({ setSortByForks, setSortByStars }) => {
  const { theme } = useContext(ThemeContext);

  // forksdesc, forksasc, starsdesc, starsasc, default
  let [sort, setSort] = useState("default");
  const [show, setShow] = useState(false);
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

  return (
    <>
      <div className="relative">
        <div
          onClick={() => {
            setShow(!show);
          }}
          className={`gap-2   cursor-pointer hover:scale-105 transition-all duration-200 w-32 h-11 rounded-r-2xl ${
            theme.mode === "light"
              ? "bg-[#d9d9d9] text-black"
              : "bg-white text-black"
          }   flex justify-center items-center`}
        >
          <span>Sort</span>
          <div className="w-2 h-2 border-b-[3px] border-r-[3px] border-black rotate-[45deg]"></div>
        </div>
        {show ? (
          <div className="z-20 py-2 gap-2 absolute text-black top-12 bg-[#d9d9d9] w-40 rounded-2xl flex flex-col justify-center items-center">
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
