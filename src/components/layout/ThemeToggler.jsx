import React from "react";
import { GrSun } from "react-icons/gr";
import { IoMdMoon } from "react-icons/io";
import { ThemeConsumer } from "../../contexts/ThemeContext";

export default function ThemeToggler() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return <button onClick={toggleTheme}>{theme === "light" ? <GrSun /> : <IoMdMoon />}</button>;
      }}
    </ThemeConsumer>
  );
}
