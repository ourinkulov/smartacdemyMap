import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getStudentsPerformance, getSemesters } from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
Chart.register(...registerables);
Chart.defaults.font.family = "Montserrat";

type Props = {
  selectedStudentId: number;
  educationTypeId: number;
  educationFormId: number;
};
const BarPerformance = ({
  selectedStudentId,
  educationTypeId,
  educationFormId,
}: Props) => {
  const [performanceData, setPerformanceData] = useState<any>([]);
  const [semesters, setSemesters] = useState<any>([]);
  const [semesterId, setSemesterId] = useState<number>(
    educationFormId == 13 ? 11 : 13
  );
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();
  const grades = educationTypeId == 11 ? [2, 3, 4] : [55, 70, 85];

  useEffect(() => {
    getSemesters(educationTypeId)
      .then((response) => {
        setSemesters(response.data.rows);
        // setSemesterId(response.data.rows[0].code);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  }, [i18n.language]);

  useEffect(() => {
    if (educationTypeId == 11) {
      getStudentsPerformance(
        selectedStudentId,
        semesterId,
        educationTypeId,
        educationFormId
      )
        .then((response) => {
          setPerformanceData(response.data.rows);
        })
        .catch((error) => console.error("Error fetching students:", error));
    } else {
      getStudentsPerformance(selectedStudentId, semesterId, educationTypeId, -1)
        .then((response) => {
          setPerformanceData(response.data.rows);
        })
        .catch((error) => console.error("Error fetching students:", error));
    }
  }, [selectedStudentId, semesterId, i18n.language]);

  const handleSemesterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSemesterId(Number(event.target.value));
  };

  const barLabels = performanceData?.map((subject: any) => {
    return subject.subject_name?.length > 43
      ? subject.subject_name.slice(0, 40) + "..."
      : subject.subject_name;
  });

  const fetchData = () => {
    const barChartData = {
      labels: barLabels,
      datasets: [
        {
          label: t("bachelorpage.unsatisfied"),
          data: performanceData?.map((subject: any) => {
            return subject.avg_grade < grades[0] ? subject.avg_grade : null;
          }),
          backgroundColor: "#EB5353",
          borderWidth: 0,
        },
        {
          label: t("bachelorpage.satisfying"),
          data: performanceData?.map((subject: any) => {
            return subject.avg_grade > grades[0] &&
              subject.avg_grade <= grades[1]
              ? subject.avg_grade
              : null;
          }),
          backgroundColor: "#FF9843",
          borderWidth: 0,
        },
        {
          label: t("bachelorpage.normal"),
          data: performanceData?.map((subject: any) => {
            return subject.avg_grade > grades[1] &&
              subject.avg_grade <= grades[2]
              ? subject.avg_grade
              : null;
          }),
          backgroundColor: "#F9D923",
          borderWidth: 0,
        },
        {
          label: t("bachelorpage.excellent"),
          data: performanceData?.map((subject: any) => {
            return subject.avg_grade > grades[2] ? subject.avg_grade : null;
          }),
          backgroundColor: "#36AE7C",
          borderWidth: 0,
        },
      ],
    };
    return { barChartData };
  };

  const { barChartData } = fetchData();

  const barChartOptions = {
    indexAxis: "y" as const,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: theme !== "dark" ? "black" : "white",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        min: educationTypeId == 11 ? 2 : 50,
        max: educationTypeId == 11 ? 5 : 100,
        ticks: {
          font: {
            family: "Montserrat",
          },
          padding: 12,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme !== "dark" ? "black" : "white",
          display: true,
          drawOnChartArea: false,
        },
        stacked: true,
        ticks: {
          font: {
            family: "Montserrat",
          },
          padding: 0,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 11,
            family: "Montserrat",
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
      datalabels: {
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
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
    <div className="flex flex-col">
      <div className="p-2">
        <div className="flex items-center">
          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-600 dark:text-white px-2"
          >
            {educationTypeId == 11
              ? t("bachelorpage.semestr")
              : t("masterpage.semestr")}
            :
          </label>
          <select
            id="select"
            name="select"
            value={semesterId}
            onChange={handleSemesterChange}
            className="mt-1 px-4 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-800"
          >
            {semesters.map((semester: any, index: number) => {
              return (
                <option key={index} value={semester.code}>
                  {semester.name}
                </option>
              );
            })}
          </select>
        </div>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default BarPerformance;
