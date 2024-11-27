import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import AdmissionStudy from "../../components/doctorate/AdmissionStudy";
import DefenseWork from "../../components/doctorate/DefenseWork";
import "../../styles/index.scss";
import { useSelector } from "react-redux";
import { IDataDashboard } from "redux/dataStored/userReducer";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faUsers,
  faChalkboard,
  faBook,
  faGraduationCap,
  faBank,
} from "@fortawesome/free-solid-svg-icons";
import useIncrementEffect from "../../hooks/useIncementEffect";
import ResearchStats from "../../components/doctorate/ResearchStats";
import ResearchResults from "../../components/doctorate/ResearchResults";
import TableResearchers from "../../components/doctorate/TableResearchers";

export default function DoctoratePage() {
  const { t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  const sectionRefs: any = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];

  const bachRef = useRef<HTMLElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const handleWheel = (event: any) => {
    const sectionIndex =
      event.deltaY > 0 ? currentSection + 1 : currentSection - 1;
    if (sectionIndex >= 0 && sectionIndex < sectionRefs.length) {
      setCurrentSection(sectionIndex);
      bachRef.current?.scrollTo({
        top: sectionRefs[sectionIndex].current?.offsetTop - 48,
        behavior: "smooth",
      });
    }
  };

  const handleWheelKeyDown = (event: any) => {
    const sectionIndex =
      event.deltaY > 0 ? currentSection + 1 : currentSection - 1;
    if (sectionIndex >= 0 && sectionIndex < sectionRefs.length) {
      setCurrentSection(sectionIndex);
      bachRef.current?.scrollTo({
        top: sectionRefs[sectionIndex].current?.offsetTop - 48,
        behavior: "smooth",
      });
    }
  };

  const calculateProgress = () => {
    if (currentSection === 0) {
      return 0;
    }
    return (currentSection / 4) * 100;
  };

  return (
    <div
      className="h-full w-full overflow-y-scroll"
      ref={bachRef as React.RefObject<HTMLDivElement>}
      onWheel={handleWheel}
      onKeyDown={handleWheelKeyDown}
    >
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          width: "100%",
          height: "3px",
          backgroundColor: theme !== "dark" ? "#14059c" : "#f59504",
          transform: `scaleX(${calculateProgress() / 100})`,
          transformOrigin: "left",
        }}
      ></div>
      <section className="px-2 md:px-4" ref={sectionRefs[0]}>
        <div className="mx-auto text-center lg:py-2">
          <dl className="grid gap-4 xl:gap-x-8 mx-auto text-gray-900 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 dark:text-white">
            <div className="flex items-center justify-around p-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faLink}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white mb-2"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 10, 50, 6)}
                </dt>
                <dd className="font-medium text-lg line-clamp-2">
                  {t("doctoratepage.research directions")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faUsers}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white mb-2"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 10, 50, 343)}
                </dt>
                <dd className="font-medium text-lg line-clamp-2">
                  {t("doctoratepage.researchers")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faChalkboard}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white mb-2"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 10, 100, 85)}
                </dt>
                <dd className="font-medium text-lg line-clamp-2">
                  {t("masterpage.supervisors")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faBook}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white mb-2"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 10, 50, 20) + "<"}
                </dt>
                <dd className="font-medium text-lg line-clamp-2">
                  {t("doctoratepage.important research topics")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white mb-2"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 20, 25, 784)}
                </dt>
                <dd className="font-medium text-lg line-clamp-2">
                  {t("masterpage.graduates")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faBank}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white mb-2"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 15, 50, 421)}
                </dt>
                <dd className="font-medium text-lg line-clamp-2">
                  {t("doctoratepage.topics bank")}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      <section
        className={`px-2 md:px-4 py-3 ${
          isCollapsed ? "w-[calc(100vw-80px)]" : "w-[calc(100vw-220px)]"
        }`}
        ref={sectionRefs[1]}
      >
        <AdmissionStudy />
      </section>
      {/* <section
        className={`px-2 md:px-4 py-3 ${
          isCollapsed ? "w-[calc(100vw-80px)]" : "w-[calc(100vw-220px)]"
        }`}
        ref={sectionRefs[2]}
      >
        <DefenseWork />
      </section> */}
      <section className="px-4 py-2" ref={sectionRefs[3]}>
        <ResearchStats />
      </section>

      <section className="px-4 py-2" ref={sectionRefs[4]}>
        <ResearchResults />
      </section>

      <section className="px-2 md:px-4 py-3" ref={sectionRefs[5]}>
        <TableResearchers />
      </section>
    </div>
  );
}
