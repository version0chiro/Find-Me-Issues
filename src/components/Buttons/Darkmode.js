import React, { useContext } from "react";
import { ThemeContext } from "../../Context/themeContext";
import SunIcon from "../../Sun.png";
import MoonIcon from "../../Moon.png";

const Darkmode = () => {
  const { theme } = useContext(ThemeContext);
  const isLightMode = theme.mode === "light";

  return (
    <button
      aria-label={`Switch to ${isLightMode ? "dark" : "light"} mode`}
      className="w-10 h-10 focus:outline-none"
    >
      <img
        src={isLightMode ? MoonIcon : SunIcon}
        alt={isLightMode ? "Moon icon" : "Sun icon"}
        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
      />
    </button>
  );
};

export default Darkmode;
