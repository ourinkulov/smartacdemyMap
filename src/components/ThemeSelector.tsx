import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("default-theme", isCurrentDark ? "light" : "dark");
    if (isCurrentDark) {
      document.getElementsByTagName("html")[0].classList.remove("dark");
    } else {
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  };
  return (
    <div className="flex items-center">
      <button onClick={handleThemeChange}>
        {theme === "dark" ? (
          <MoonIcon className="h-5 w-5 pointer m-1.5 sm:m-2" />
        ) : (
          <SunIcon className="h-5 w-5 pointer m-1.5 sm:m-2" />
        )}
      </button>
    </div>
  );
}
