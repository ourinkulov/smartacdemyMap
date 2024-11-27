import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  getFaculties,
  typesOfTraining,
  getSemesters,
  getSpecialities,
} from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IDataDashboard } from "redux/dataStored/userReducer";
Chart.register(...registerables);
Chart.defaults.font.family = "Montserrat";

type BarProps = {
  educationTypeId: number;
};

const ChartSection = (props: BarProps) => {
  const { educationTypeId } = props;
  const [typesTraining, setTypesTraining] = useState<any>();
  const [faculties, setFaculties] = useState<any>([]);
  const [semesters, setSemesters] = useState<any>([]);
  const [semesterId, setSemesterId] = useState<number>(13);
  const [specialityId, setSpecialityId] = useState<number>(18);
  const [department_id, setDepartmentId] = useState<number>(4);
  const { theme } = useContext(ThemeContext);
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    getSemesters(educationTypeId)
      .then((response) => {
        setSemesters(response.data.rows);
        // setSemesterId(response.data.rows[0].code);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  }, [i18n.language]);

  useEffect(() => {
    typesOfTraining(-1, semesterId, specialityId, educationTypeId)
      .then((response) => {
        setTypesTraining(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    getSpecialities()
      .then((response) => {
        setFaculties(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [specialityId, semesterId, i18n.language]);

  const handleSemesterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSemesterId(Number(event.target.value));
  };

  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentId(Number(event.target.value));
  };

  const labels = typesTraining?.map((training: any) => {
    return training.subject_name?.split("(")[0]?.split(" ");
  });

  const courseTypes = [
    "training_type_11",
    "training_type_12",
    "training_type_13",
    "training_type_14",
  ];

  const datasets = courseTypes.map((courseType) =>
    typesTraining?.map((course: any) => course[courseType])
  );

  const fetchData = () => {
    const barChartData = {
      labels: labels,
      datasets: [
        {
          label: t("bachelorpage.lecture"),
          data: datasets[0],
          backgroundColor: "#7752FE",
          borderColor: "#7752FE",
          borderWidth: 1,
        },
        {
          label: t("bachelorpage.seminar"),
          data: datasets[1],
          backgroundColor: "#8E8FFA",
          borderColor: "#8E8FFA",
          borderWidth: 1,
        },
        {
          label: t("bachelorpage.practical"),
          data: datasets[2],
          backgroundColor: "#8696FE",
          borderColor: "#8696FE",
          borderWidth: 1,
        },
        {
          label: t("bachelorpage.lab"),
          data: datasets[3],
          backgroundColor: "#C2D9FF",
          borderColor: "#C2D9FF",
          borderWidth: 1,
        },
      ],
    };

    return { barChartData };
  };

  const { barChartData } = fetchData();

  const chartOptions = {
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    scales: {
      x: {
        stacked: true,
        scaleInstanceWidth: 100,
        grid: {
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        ticks: {
          font: {
            family: "Montserrat",
          },
          minTextWidth: 100,
          color: theme !== "dark" ? "black" : "white",
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        stacked: true,
        grid: {
          offset: true,
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        ticks: {
          font: {
            family: "Montserrat",
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            family: "Montserrat",
            size: 14,
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
      datalabels: {
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
        font: {
          family: "Montserrat",
          size: 12,
        },
        color: theme !== "dark" ? "black" : "white",
        formatter: function (value: any) {
          if (value > 0) {
            return value.toString();
          } else {
            return "";
          }
        },
      },
    },
  };

  return (
    <div className="flex bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
      <div className="w-full">
        <h2 className="text-base md:text-lg font-semibold mb-2 leading-5">
          {t("bachelorpage.learn_type") as string}
        </h2>
        <hr />
        <div className="flex items-center py-2 flex-wrap">
          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("bachelorpage.faculty") as string} :
            <select
              id="select"
              name="select"
              value={department_id}
              onChange={handleFacultyChange}
              className="mt-1 px-2 py-1 border-b border-gray-300 dark:bg-slate-700 text-xs sm:text-sm bg-transparent truncate max-sm:max-w-[320px]"
            >
              {faculties.map((faculty: any) => {
                return (
                  <option value={faculty.id} key={faculty.id}>
                    {faculty.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("masterpage.semestr") as string} :
            <select
              id="select"
              name="select"
              value={semesterId}
              onChange={handleSemesterChange}
              className="mt-1 px-4 py-1 border-b border-gray-300 dark:bg-slate-700 text-sm bg-transparent"
            >
              {semesters.map((semester: any, index: number) => {
                return (
                  <option key={index} value={semester.code}>
                    {semester.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div
          className={`${
            isCollapsed
              ? "w-[calc(100vw-132px)] h-[calc(100vh-280px)]"
              : "w-[calc(100vw-272px)] h-[calc(100vh-280px)]"
          }`}
        >
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
