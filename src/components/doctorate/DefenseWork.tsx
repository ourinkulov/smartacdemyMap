import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { coursesOfStudy, getResearchPeriods } from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IDataDashboard } from "redux/dataStored/userReducer";
Chart.register(...registerables);
Chart.defaults.font.family = "Montserrat";

export default function DefenseWork() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(6);
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(Number(event.target.value));
  };

  useEffect(() => {
    getResearchPeriods()
      .then((response) => {
        setPeriods(response.data.rows);
        setSelectedPeriod(response.data.rows[6]?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [i18n.language]);

  const labels = ["12.12.08", "12.12.08", "12.12.08", "12.12.08"];
  // const labels = coursesStudy?.map((course: any) => {
  //   return course.specialty_name?.split(" ");
  // });
  // const courseTypes = ["ft_course", "sd_course", "th_course", "fr_course"];
  // console.log(labels);

  // const datasets = courseTypes.map((courseType) =>
  //   coursesStudy?.map((course: any) => course[courseType])
  // );
  const datasets = [
    [30, 48, 55, 75],
    [20, 30, 110, 95],
  ];
  // const datasets = [{}]
  const fetchData = () => {
    const barChartData = {
      labels: labels,
      datasets: [
        {
          label: "DSc",
          data: datasets[0],
          backgroundColor: "#4CBB17",
          borderColor: "#4CBB17",
          borderWidth: 1,
        },
        {
          label: "PhD",
          data: datasets[1],
          backgroundColor: "#596FB7",
          borderColor: "#596FB7",
          borderWidth: 1,
        },
      ],
    };

    return { barChartData };
  };

  const { barChartData } = fetchData();
  const chartOptions = {
    animation: {
      delay: (context: any) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 200 + context.datasetIndex * 10;
        }
        return delay;
      },
      // duration: 500,
      // easing: "easeInBack" as const,
    },
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cdcdcd" : "gray",
        },
        ticks: {
          color: theme !== "dark" ? "black" : "white",
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
            size: 14,
          },
          color: theme !== "dark" ? "black" : "white",
        },
      },
      labels: {
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

  // general data
  const pieDefenseGeneral = [
    { label: "PhD", count: 40 },
    { label: "DSc", count: 60 },
  ];

  const pieDefensePhd = [
    { label: t("doctoratepage.fundamental doctoral"), count: 40 },
    { label: t("doctoratepage.independent researcher"), count: 60 },
  ];

  const pieDefenseDsc = [
    { label: t("doctoratepage.fundamental doctoral"), count: 40 },
    { label: t("doctoratepage.independent researcher"), count: 60 },
  ];

  const fetchDataPie = (args: any) => {
    return {
      labels: [args[0].label, args[1].label],
      datasets: [
        {
          data: [args[0].count, args[1].count],
          backgroundColor: ["#FFDD95", "#86A7FC"],
          borderColor: ["#FFDD95", "#86A7FC"],
          borderWidth: 1,
        },
      ],
    };
  };

  const pieChartData = fetchDataPie(pieDefenseGeneral);
  const pieChartDataPhd = fetchDataPie(pieDefensePhd);
  const pieChartDataDsc = fetchDataPie(pieDefenseDsc);

  const pieChartOptions = {
    rotation: -120,
    maintainAspectRatio: false,
    layout: {
      padding: 15,
    },
    animation: {
      delay: 200,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 25,
          color: theme !== "dark" ? "black" : "white",
          font: {
            size: 14,
            family: "Montserrat",
          },
        },
      },
      labels: {
        color: theme !== "dark" ? "black" : "white",
      },
      datalabels: {
        font: {
          size: 18,
          family: "Montserrat",
        },
        formatter: (value: any) => {
          return `${value}%`;
        },
      },
    },
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md flex items-center gap-x-4 p-4 mb-4">
        <div className="text-base md:text-lg font-semibold leading-5 py-2 px-3">
          {t("doctoratepage.defense")}
        </div>
        <label
          htmlFor="select"
          className="block text-sm font-medium text-gray-700 dark:text-white px-2"
        >
          <select
            id="select"
            name="select"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="mt-1 mx-2 px-2 py-1 dark:bg-slate-700 text-xs sm:text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-md"
          >
            {periods.map((item: any, index: number) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="w-full flex gap-4 mt-2">
        <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md w-2/5 p-4 h-[40vh] flex items-center justify-center">
          <Bar
            className="max-h-[35vh]"
            data={barChartData}
            options={chartOptions}
          />
        </div>
        <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md w-1/5 p-4 h-[40vh] flex flex-col items-center">
          <div className="text-xl font-bold text-center mb-2">
            {t("professorspage.general")}
          </div>
          <Pie
            className="max-h-[35vh]"
            data={pieChartData}
            options={pieChartOptions as any}
          />
        </div>
        <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md w-2/5 p-4 h-[40vh] flex gap-4">
          <div className="w-[45%] flex flex-col items-center">
            <div className="text-xl font-bold text-center mb-2">
              {t("professorspage.phd")}
            </div>
            <Pie
              className="max-h-[35vh]"
              data={pieChartDataPhd}
              options={pieChartOptions as any}
            />
          </div>
          <div className="w-[45%] flex flex-col items-center">
            <div className="text-xl font-bold text-center mb-2">
              {t("professorspage.dsc")}
            </div>
            <Pie
              className="max-h-[35vh]"
              data={pieChartDataDsc}
              options={pieChartOptions as any}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
