import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { coursesOfStudy } from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IDataDashboard } from "redux/dataStored/userReducer";
import Loader from "../../utils/Loader";
Chart.register(...registerables);
Chart.defaults.font.family = "Montserrat";

type ChartProps = {
  educationTypeId: number;
  educationFormId: number;
};

const ChartSection = (props: ChartProps) => {
  const { educationTypeId, educationFormId } = props;
  const [coursesStudy, setCoursesStudy] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();

  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  useEffect(() => {
    coursesOfStudy(educationTypeId, educationFormId)
      .then((response) => {
        setCoursesStudy(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  const labels = coursesStudy?.map((course: any) => {
    if (course.specialty_name) {
      return course.specialty_name?.split(" ");
    } else {
      return i18n.language.toLocaleLowerCase() == "uz"
        ? "Yo'nalish nomi"
        : "Йуналиш номи";
    }
  });

  const courseTypes = ["ft_course", "sd_course", "th_course", "fr_course"];

  const datasets = courseTypes.map((courseType) =>
    coursesStudy?.map((course: any) => course[courseType])
  );

  const fetchData = () => {
    const barChartData = {
      labels: labels,
      datasets: [
        {
          label: `1 ${t("bachelorpage.course") as string}`,
          data: datasets[0],
          backgroundColor: "#FFF017",
          borderColor: "#FFF017",
          borderWidth: 1,
        },
        {
          label: `2 ${t("bachelorpage.course") as string}`,
          data: datasets[1],
          backgroundColor: "#FFA500",
          borderColor: "#FFA500",
          borderWidth: 1,
        },
        ...(educationTypeId == 11 || educationFormId == 13
          ? [
              {
                label: `3 ${t("bachelorpage.course") as string}`,
                data: datasets[2],
                backgroundColor: "#00FF00",
                borderColor: "#00FF00",
                borderWidth: 1,
              },
            ]
          : []),
        ...(educationTypeId == 11 || educationFormId == 13
          ? [
              {
                label: "4 kurs",
                data: datasets[3],
                backgroundColor: "#1E90FF",
                borderColor: "#1E90FF",
                borderWidth: 1,
              },
            ]
          : []),
      ],
    };

    return { barChartData };
  };

  const { barChartData } = fetchData();
  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        ticks: {
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          offset: true,
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        ticks: {
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        boxHeight: 10,
        labels: {
          font: {
            family: "Montserrat",
            size: 14,
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
      labels: {
        font: {
          size: 14,
          family: "Montserrat",
        },
        color: theme !== "dark" ? "black" : "white",
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
    <div className="flex bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
      <div className="w-full h-full">
        <h2 className="text-base md:text-lg font-semibold mb-2 leading-5">
          {t("bachelorpage.courses_study") as string}
        </h2>
        <hr />
        <div
          className={`${
            isCollapsed
              ? "w-[calc(100vw-132px)] h-[calc(100vh-280px)]"
              : "w-[calc(100vw-272px)] h-[calc(100vh-280px)]"
          }`}
        >
          {isLoading ? (
            <div className="h-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <Bar data={barChartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
