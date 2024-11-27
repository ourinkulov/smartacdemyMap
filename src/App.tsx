import "./styles/App.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import { FC, useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeContext } from "./theme/ThemeContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IAuth } from "./redux/dataStored/authReducer";
import Layout from "./layout/Layout";

// Science Pages
import GeneralPage from "./pages/science/SciencePage";
import ChairsPotentialPage from "./pages/science/ChairsPotentialPage";
import ScienceDynamicPage from "./pages/science/ScienceDynamicPage";

// Education Pages
import BachelorPage from "./pages/education/BachelorPage";
import SchedulePage from "./pages/education/SchedulePage";
import DoctoratePage from "./pages/education/DoctoratePage";
import ProfessorsPage from "./pages/education/ProfessorsPage";
import MasterPage from "./pages/education/MasterPage";
import TimelinePage from "./pages/education/TimelinePage";
import ParttimePage from "./pages/education/ParttimePage";

// Discipline Pages
import TestcenterPage from "./pages/discipline/TestcenterPage";
import DocumentPage from "./pages/discipline/DocumentPage";

// Academy Pages
import StructurePage from "./pages/academy/StructurePage";

// Main Pages
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import NotfoundPage from "./pages/NotfoundPage";

const App: FC = () => {
  const { t, i18n } = useTranslation<string>();

  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  const basename = document.querySelector("base")?.getAttribute("href") ?? "/";

  const isLoggedIn = useSelector((state: IAuth) => state.auth.isLoggedIn);

  useEffect(() => {
    document.title = t("smartacademy");
  }, [i18n.language]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <HashRouter basename={basename}>
        <div className={`theme-${theme}`}>
          <div className="content-wrapper">
            {isLoggedIn ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Navigate replace to="/" />} />
                  {/* academy */}
                  <Route path="/academy" element={<StructurePage />} />
                  {/* <Route path="/territory" element={} />
                  <Route path="/entrance" element={} />
                  <Route path="/intercoop" element={} /> */}
                  {/* education */}
                  <Route path="/education" element={<BachelorPage />} />
                  <Route path="/doctorate" element={<DoctoratePage />} />
                  <Route path="/master" element={<MasterPage />} />
                  <Route path="/parttime" element={<ParttimePage />} />
                  {/* <Route path="/training" element={<TrainingPage />} />*/}
                  <Route path="/timeline" element={<TimelinePage />} />
                  <Route path="/activities" element={<ProfessorsPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  {/*<Route path="/alumni" element={<AlumniPage />} /> */}
                  {/* science */}
                  <Route path="/science" element={<GeneralPage />} />
                  <Route
                    path="/chairspotential"
                    element={<ChairsPotentialPage />}
                  />
                  <Route
                    path="/sciencedynamics"
                    element={<ScienceDynamicPage />}
                  />
                  {/* discipline */}
                  <Route path="/testcenter" element={<TestcenterPage />} />
                  <Route path="/doc" element={<DocumentPage />} />
                  {/* others */}
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotfoundPage />} />
                </Routes>
              </Layout>
            ) : (
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate replace to="/login" />} />
              </Routes>
            )}
          </div>
        </div>
      </HashRouter>
    </ThemeContext.Provider>
  );
};

export default App;
