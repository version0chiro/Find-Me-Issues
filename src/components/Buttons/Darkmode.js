import React, { useContext } from "react";
import { ThemeContext } from "../../Context/themeContext";
import sol from "../../Sun.png";
import lua from "../../Moon.png";

function Darkmode() {
  const { theme } = useContext(ThemeContext);
  return theme.mode === "light" ? (
    <img src={lua} alt="lua icone" className="w-10"></img>
  ) : (
    <img src={sol} alt="sol icone" className="w-10"></img>
  );
}

export default Darkmode;
