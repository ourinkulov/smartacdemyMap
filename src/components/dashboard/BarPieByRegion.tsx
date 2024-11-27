import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAverageByProvince, getSemesters } from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
Chart.register(...registerables);
Chart.defaults.font.family = "Montserrat";

type ChartSectionProps = {
  educationTypeId: number;
};

const ChartSection = (props: ChartSectionProps) => {
  const { educationTypeId } = props;
  const [studentsAverage, setStudentsAverage] = useState<any>([]);
  const [semesters, setSemesters] = useState<any>([]);
  const [semesterId, setSemesterId] = useState<number>(12);
  const [selectedRegion, setSelectedRegion] =
    useState<string>("Toshkent shahri");
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    getSemesters(educationTypeId)
      .then((response) => {
        setSemesters(response.data.rows);
        setSemesterId(response.data.rows[0].code);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  }, [i18n.language]);

  useEffect(() => {
    getAverageByProvince(semesterId, educationTypeId)
      .then((response) => {
        setStudentsAverage(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [semesterId, i18n.language]);

  const handleSemesterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSemesterId(Number(event.target.value));
  };

  const barLabels = studentsAverage?.map((region: any) => {
    return region.name;
  });

  const pieDataset = studentsAverage?.find((region: any) => {
    if (region.name === selectedRegion) {
      return region;
    }
  });

  const fetchData = () => {
    const barChartData = {
      labels: barLabels,
      datasets: [
        {
          label: t("bachelorpage.unsatisfied"),
          data: studentsAverage?.map((region: any) => {
            return region.avg_mark < 3 ? region.avg_mark : null;
          }),
          backgroundColor: "#EB5353",
          borderWidth: 0,
        },
        {
          label: t("bachelorpage.satisfying"),
          data: studentsAverage?.map((region: any) => {
            return region.avg_mark >= 3 && region.avg_mark < 3.5
              ? region.avg_mark
              : null;
          }),
          backgroundColor: "#FF9843",
          borderWidth: 0,
        },
        {
          label: t("bachelorpage.normal"),
          data: studentsAverage?.map((region: any) => {
            return region.avg_mark >= 3.5 && region.avg_mark < 4.5
              ? region.avg_mark
              : null;
          }),
          backgroundColor: "#F9D923",
          borderWidth: 0,
        },
        {
          label: t("bachelorpage.excellent"),
          data: studentsAverage?.map((region: any) => {
            return region.avg_mark >= 4.5 ? region.avg_mark : null;
          }),
          backgroundColor: "#36AE7C",
          borderWidth: 0,
        },
      ],
    };

    const pieChartData = {
      labels: [],
      datasets: [
        {
          data: [
            pieDataset?.unsatisfied,
            pieDataset?.normal,
            pieDataset?.satisfying,
          ],
          backgroundColor: ["#EB5353", "#F9D923", "#36AE7C"],
          borderColor: ["#FF6868", "#FFCF81", "#65B74190"],
          borderWidth: 1,
        },
      ],
    };

    return { barChartData, pieChartData };
  };

  const { barChartData, pieChartData } = fetchData();

  const barChartOptions = {
    indexAxis: "y" as const,
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        min: 2,
        max: 5,
        ticks: {
          font: {
            family: "Montserrat",
          },
          padding: 5,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: false,
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        stacked: true,
        ticks: {
          font: {
            family: "Montserrat",
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
    },
    onClick: (event: any, elements: any, chart: any) => {
      const clickedBarIndex = elements[0].index;
      const clickedBarLabel = barChartData.labels[clickedBarIndex];
      setSelectedRegion(clickedBarLabel);
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
            family: "Montserrat",
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
      datalabels: {
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -30,
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

  const pieChartOptions = {
    rotation: -120,
    maintainAspectRatio: false,
    layout: {
      padding: 15,
    },
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          padding: 25,
          color: theme !== "dark" ? "black" : "white",
          font: {
            size: 16,
            family: "Montserrat",
          },
        },
      },
      datalabels: {
        font: {
          size: 18,
          family: "Montserrat",
        },
      },
    },
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-700 rounded-lg shadow-md p-2 w-full">
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2 leading-5">
          {t("bachelorpage.student_average") as string}
        </h2>
        <hr />
      </div>
      <div className="flex max-xl:flex-wrap">
        <div className="w-full xl:w-2/3">
          <div className="flex items-center">
            <label
              htmlFor="select"
              className="block text-sm font-medium text-gray-700 dark:text-white px-2"
            >
              {t("bachelorpage.semestr") as string} :
            </label>
            <select
              id="select"
              name="select"
              value={semesterId}
              onChange={handleSemesterChange}
              className="mt-1 px-4 py-1 border-b border-gray-30 text-sm dark:bg-slate-700"
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
        <div className="w-full xl:w-1/3 flex flex-col justify-center items-center font-medium ">
          {selectedRegion}
          <div className="w-[40vh] h-[40vh]">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
