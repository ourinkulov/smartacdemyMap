import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faChalkboardTeacher,
  faPersonChalkboard,
  faPuzzlePiece,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import {
  getStudentsByProvince,
  getUniversityStatistics,
} from "../../utils/Requests";
import { boundaries } from "../../assets/geoboundaries";
import ChartSection from "../../components/dashboard/ChartSection";
import BarLearnTypeMaster from "../../components/dashboard/BarLearnTypeMaster";
import BarPieByRegionMaster from "../../components/dashboard/BarPieByRegionMaster";
import useIncrementEffect from "../../hooks/useIncementEffect";
import { ThemeContext } from "../../theme/ThemeContext";
import PieByHoursMaster from "../../components/dashboard/PieByHoursMaster";
import TableGroup from "../../components/dashboard/TableGroup";

function MasterPage() {
  const { t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);
  const [statData, setStatData] = useState({
    courses: {
      cnt: 0,
      name: t("bachelorpage.course"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    faculties: {
      cnt: 0,
      name: t("bachelorpage.faculty"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    additionalclasses: {
      cnt: 0,
      name: t("bachelorpage.additionalclasses"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    groups: {
      cnt: 0,
      name: t("bachelorpage.groups"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    squads: {
      cnt: 0,
      name: t("bachelorpage.squads"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    subjects: {
      cnt: 0,
      name: t("bachelorpage.subjects"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    chairs: {
      cnt: 0,
      name: t("bachelorpage.chairs"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
    teachers: {
      cnt: 0,
      name: t("bachelorpage.teachers"),
      icon: <FontAwesomeIcon icon={faPersonChalkboard} size={"3x"} />,
    },
  });

  const [studentsByRegion, setStudentsByRegion] = useState<any>(null);
  const [studentsTotal, setStudentsTotal] = useState<number>(0);

  useEffect(() => {
    getStudentsByProvince().then((response) => {
      const studentsData = response.data?.rows;
      const mapData = boundaries.features;

      const total = studentsData?.reduce(
        (accumulator: number, student: any) =>
          accumulator + student.students_cnt,
        0
      );
      setStudentsTotal(total);

      const output = mapData.map((region) => ({
        ...region,
        properties: {
          ...region.properties,
          students_cnt: studentsData
            .find(
              (x: { name: string }) =>
                x.name.replace(/['‘’]/g, "").toLowerCase() ===
                region.properties.shapeNameUz
                  .replace(/['‘’]/g, "")
                  .toLowerCase()
            )
            .students_cnt.toString(),
          translations: studentsData
            .find(
              (x: { name: string }) =>
                x.name.replace(/['‘’]/g, "").toLowerCase() ===
                region.properties.shapeNameUz
                  .replace(/['‘’]/g, "")
                  .toLowerCase()
            )
            .translations.toString(),
        },
      }));
      setStudentsByRegion({
        ...boundaries,
        features: output,
      });
    });
  }, []);

  useEffect(() => {
    getUniversityStatistics().then((response) => {
      setStatData({
        additionalclasses: {
          ...statData.additionalclasses,
          cnt: response.data[0]?.cnt,
        },
        chairs: {
          ...statData.chairs,
          cnt: response.data[1]?.cnt,
        },
        courses: {
          ...statData.courses,
          cnt: response.data[2]?.cnt,
        },
        faculties: {
          ...statData.faculties,
          cnt: response.data[3]?.cnt,
        },
        groups: {
          ...statData.groups,
          cnt: response.data[4]?.cnt,
        },
        squads: {
          ...statData.squads,
          cnt: response.data[5]?.cnt,
        },
        subjects: {
          ...statData.subjects,
          cnt: response.data[6]?.cnt,
        },
        teachers: {
          ...statData.teachers,
          cnt: response.data[7]?.cnt,
        },
      });
    });
  }, []);

  const sectionRefs: any = [
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
      className="h-full overflow-y-scroll"
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
      <section className="dark:bg-bodyBackgroundColor" ref={sectionRefs[0]}>
        <div className="px-4 mx-auto text-center lg:py-2">
          <dl className="grid gap-4 xl:gap-x-8 mx-auto text-gray-900 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 dark:text-white">
            <div className="flex items-center justify-around bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg p-2 py-6 transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 1, 150, 3)}
                </dt>
                <dd className="font-medium text-xl line-clamp-1">
                  {t("masterpage.master_courses")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg p-2 py-6 transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 1, 15, 55)}
                </dt>
                <dd className="font-medium text-xl line-clamp-1">
                  {t("masterpage.master_students")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg p-2 py-2 transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="flex flex-col items-center">
                <dt className="text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 1, 15, 55)}
                </dt>
                <dd className="font-medium text-xl line-clamp-2">
                  {t("masterpage.supervisors")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg p-2 py-6 transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faPuzzlePiece}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 1, 150, 8)}
                </dt>
                <dd className="font-medium text-xl line-clamp-1">
                  {t("masterpage.modules")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg p-2 py-6 transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faBook}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 1, 50, 18)}
                </dt>
                <dd className="font-medium text-xl line-clamp-1">
                  {t("masterpage.disciplines")}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-around bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg p-2 py-6 transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {useIncrementEffect(0, 1, 5, 324)}
                </dt>
                <dd className="font-medium text-xl line-clamp-1">
                  {t("masterpage.graduates")}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>
      <section className="px-4 py-3" id="chart">
        <ChartSection educationTypeId={12} educationFormId={12} />
      </section>

      <section className="px-4 py-3" ref={sectionRefs[1]}>
        <BarLearnTypeMaster educationTypeId={12} />
      </section>

      <section className="px-4 py-3" ref={sectionRefs[2]}>
        <PieByHoursMaster educationTypeId={12} />
      </section>

      <section className="px-4 py-3" ref={sectionRefs[3]}>
        <BarPieByRegionMaster educationTypeId={12} />
      </section>

      <section className="px-4 py-3" ref={sectionRefs[4]}>
        <TableGroup educationTypeId={12} educationFormId={12} />
      </section>
    </div>
  );
}

export default MasterPage;
