import { useEffect, useRef, useState } from "react";
import langugagesData from "../../data/languages.json";

const CustomSelect = ({ theme, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (lang) => {
    setLanguage(lang);
  };
  useEffect(() => {
    setIsOpen(false);
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Handle click events outside of dropdown Menu
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={selectRef}
      className="inline-block w-full md:w-40 focus:outline-none"
    >
      {/* Custom Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center px-4 rounded-md border outline-none${
          theme.mode === "dark"
            ? "bg-slate-500 opacity-55 hover:opacity-100 text-slate-200 "
            : "bg-slate-200 opacity-55 hover:opacity-100 text-black"
        }  transition duration-200 ease-in-out`}
      >
        {language || "Escolha uma opção"}
        <span className="ml-2 transform transition-transform duration-200 ease-in-out">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <span className="font-mono max-sm:hidden absolute z-50 text-[7px] left-1/6 lg:left-1/2 -bottom-1 lg:bottom-6 border-b-2 border-solid border-b-cyan-800">
            scroll
          </span>
          <ul
            className={`absolute z-10 mt-[0.75rem] h-40  overflow-x-hidden grid grid-cols-2 gap-1 sm:grid-cols-4 overflow-y-scroll  w-1/2  py-1 dark:bg-slate-700 border rounded-md shadow-lg transform  ${
              isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            } ${
              theme.mode === "dark"
                ? "bg-slate-700 text-slate-200 border-slate-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <li
              className={`opacity-50 leading-9 cursor-pointer  text-[8px]  rounded-br-3xl border-b-2 border-r-2 border-r-slate-400 border-b-slate-500`}
              disabled
            >
              Escolha uma opção
            </li>
            {langugagesData.languages.map((lang, index) => (
              <li
                key={index}
                onClick={() => handleSelect(lang)}
                className={`p-2 cursor-pointer  text-sm hover:text-white transition-colors duration-150 ${
                  theme.mode === "dark"
                    ? "bg-slate-700 text-slate-200 hover:bg-indigo-500"
                    : "bg-slate-50 text-black hover:bg-indigo-100"
                }`}
              >
                {lang}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CustomSelect;
