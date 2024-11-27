import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { getScienceDynamics } from "../../utils/Requests";
import Loader from "../../utils/Loader";

Chart.register(...registerables);

const DynamicsCharts = () => {
  const [dynamicsData, setDynamicsData] = useState<any>([]);
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getScienceDynamics()
      .then((response) => {
        setIsLoading(true);
        setDynamicsData(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  const years = dynamicsData?.map((item: any) => item.year);
  const phdCounts = dynamicsData?.map((item: any) => item.phd_cnt);
  const dscCounts = dynamicsData?.map((item: any) => item.dsc_cnt);
  const professorCounts = dynamicsData?.map((item: any) => item.professor_cnt);
  const docentCounts = dynamicsData?.map((item: any) => item.docent_cnt);

  const dataDsc = {
    labels: years,
    datasets: [
      {
        label: `${t("chairspotentialpage.science doctors") as string} ${
          t("dynamics degree") as string
        }`,
        data: dscCounts,
        fill: false,
        borderColor: "rgb(0, 100, 0)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptionsDsc = {
    maintainAspectRatio: false,
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "#cecece" : "#334155",
        },
        ticks: {
          padding: 2,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        min: 0,
        max: 5,
        stacked: true,
        ticks: {
          padding: 2,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
      datalabels: {
        font: {
          family: "Montserrat",
          weight: "bold",
        },
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
      },
    },
  };

  const dataPhd = {
    labels: years,
    datasets: [
      {
        label: `${t("chairspotentialpage.philosophy doctors") as string} ${
          t("dynamics degree") as string
        }`,
        data: phdCounts,
        fill: false,
        borderColor: "rgb(255, 100, 0)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptionsPhd = {
    maintainAspectRatio: false,
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "#cecece" : "#334155",
        },
        ticks: {
          padding: 1,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",

          font: {
            family: "Montserrat",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        min: 0,
        max: 20,
        stacked: true,
        ticks: {
          padding: 2,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
      datalabels: {
        font: {
          family: "Montserrat",
          weight: "bold",
        },
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
      },
    },
  };

  const dataProf = {
    labels: years,
    datasets: [
      {
        label: `${t("professorspage.professor") as string} ${
          t("dynamics title") as string
        }`,
        data: professorCounts,
        fill: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 100, 0)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptionsProf = {
    maintainAspectRatio: false,
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "#cecece" : "#334155",
        },
        ticks: {
          padding: 4,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        min: 0,
        max: 10,
        stacked: true,
        ticks: {
          padding: 4,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
      datalabels: {
        font: {
          family: "Montserrat",
          weight: "bold",
        },
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
      },
    },
  };

  const dataDocent = {
    labels: years,
    datasets: [
      {
        label: `${t("professorspage.docent") as string} ${
          t("dynamics title") as string
        }`,
        data: docentCounts,
        fill: false,
        borderColor: "rgb(255, 100, 0)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptionsDocent = {
    maintainAspectRatio: false,
    animation: {
      delay: 100,
      duration: 1000,
      easing: "easeInBack" as const,
    },
    scales: {
      x: {
        grid: {
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "#cecece" : "#334155",
        },
        ticks: {
          padding: 1,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: theme !== "dark" ? "#cecece" : "#334155",
          tickColor: theme !== "dark" ? "black" : "white",
        },
        min: 0,
        max: 20,
        stacked: true,
        ticks: {
          padding: 2,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme !== "dark" ? "black" : "white",
          font: {
            family: "Montserrat",
          },
        },
      },
      datalabels: {
        font: {
          family: "Montserrat",
          weight: "bold",
        },
        display: true,
        align: "start" as const,
        anchor: "end" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <div className="w-[95%]">
            <Line
              data={dataDsc}
              options={lineChartOptionsDsc as any}
              style={{ height: "20vh", width: "100%" }}
            />
          </div>
          <div className="w-[95%]">
            <Line
              data={dataPhd}
              options={lineChartOptionsPhd as any}
              style={{ height: "20vh", width: "100%" }}
            />
          </div>
          <div className="w-[95%]">
            <Line
              data={dataProf}
              options={lineChartOptionsProf as any}
              style={{ height: "20vh", width: "100%" }}
            />
          </div>
          <div className="w-[95%]">
            <Line
              data={dataDocent}
              options={lineChartOptionsDocent as any}
              style={{ height: "20vh", width: "100%" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicsCharts;
