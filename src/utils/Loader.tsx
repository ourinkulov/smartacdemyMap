import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function Loader() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="animate-pulse">
      {theme !== "dark" ? (
        <img src="./assets/logogray.png" width={250} />
      ) : (
        <img src="./assets/logopng.png" width={250} />
      )}
    </div>
  );
}
