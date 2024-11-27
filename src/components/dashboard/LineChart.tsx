import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getStudentsAvgGradeBySemester } from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

Chart.register(...registerables);

type Props = {
  selectedStudentId: number;
  educationTypeId: number;
  educationFormId: number;
};
const LineChart = ({
  selectedStudentId,
  educationTypeId,
  educationFormId,
}: Props) => {
  const [performanceData, setPerformanceData] = useState<any>([]);
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    if (educationTypeId == 11) {
      getStudentsAvgGradeBySemester(
        selectedStudentId,
        educationTypeId,
        educationFormId
      )
        .then((response) => {
          setPerformanceData(response.data?.rows);
        })
        .catch((error) => console.error("Error fetching students:", error));
    } else {
      getStudentsAvgGradeBySemester(selectedStudentId, educationTypeId, -1)
        .then((response) => {
          setPerformanceData(response.data?.rows);
        })
        .catch((error) => console.error("Error fetching students:", error));
    }
  }, [selectedStudentId, i18n.language]);

  const lineLabels = performanceData?.map((subject: any) => {
    return subject.semester_name;
  });

  const fetchData = () => {
    const lineChartData = {
      labels: lineLabels,
      data: performanceData.map((data: any) => data.avg_grade),
    };
    return { lineChartData };
  };

  const { lineChartData } = fetchData();

  const dataByType =
    educationFormId != 13
      ? [0, 0, ...lineChartData?.data]
      : [...lineChartData?.data];

  const labelByType =
    educationFormId != 13
      ? [
          educationTypeId == 11
            ? `1-${t("bachelorpage.semestr") as string}`
            : `1-${t("masterpage.semestr") as string}`,
          educationTypeId == 11
            ? `2-${t("bachelorpage.semestr") as string}`
            : `2-${t("masterpage.semestr") as string}`,
          educationTypeId == 11
            ? `3-${t("bachelorpage.semestr") as string}`
            : `3-${t("masterpage.semestr") as string}`,
        ]
      : [
          `1-${t("bachelorpage.semestr") as string}`,
          `2-${t("bachelorpage.semestr") as string}`,
        ];

  const data = {
    labels: labelByType,
    datasets: [
      {
        label: `${t("bachelorpage.score") as string}`,
        data: dataByType,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "black" : "white",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        ticks: {
          padding: 2,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: false,
          color: theme !== "dark" ? "black" : "white",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        min: 0,
        max: educationTypeId == 11 ? 5 : 100,
        stacked: true,
        ticks: {
          padding: 2,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      datalabels: {
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
      },
    },
  };

  return (
    <div className="flex flex-col p-2">
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};

export default LineChart;
