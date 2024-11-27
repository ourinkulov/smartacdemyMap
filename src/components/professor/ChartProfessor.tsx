import React, { useContext, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTranslation } from "react-i18next";
import { smartRatingProfessor } from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

const ChartProfessor: React.FC<any> = ({ users_id }) => {
  const { i18n, t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);
  const [smartRatings, setSmartRatings] = useState<any>();

  useEffect(() => {
    smartRatingProfessor(users_id)
      .then((response) => {
        setSmartRatings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users_id, i18n.language]);

  const labels = smartRatings?.map((rating: any) => {
    switch (rating.name) {
      case "training":
        return t("professorspage.training");
      case "public_affairs":
        return t("professorspage.public_affairs");
      case "edu_meth_works":
        return t("professorspage.edu_meth_works");
      case "scientific_works":
        return t("professorspage.scientific_works");
      default:
        break;
    }
  });
  const datasets = smartRatings?.map((rating: any) => {
    return rating.all_ball;
  });

  const fetchData = () => {
    const radarChartData = {
      labels: labels,
      datasets: [
        {
          label: t("professorspage.performance_of_teachers"),
          data: datasets,
          backgroundColor: theme !== "dark" ? "#14059c7d" : "#f5950463",
          pointBackgroundColor: theme !== "dark" ? "#14069c" : "orange",
          borderColor: theme !== "dark" ? "#14069c" : "orange",
          borderWidth: 2,
          pointRadius: 3,
          hoverBackgroundColor: ["rgba(54, 162, 235, 0.8)"],
        },
      ],
    };

    return { radarChartData };
  };

  const { radarChartData } = fetchData();
  return (
    <Radar
      data={radarChartData}
      options={{
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 1,
            beginAtZero: true,
            pointLabels: {
              font: {
                size: 14,
              },
              color: theme !== "dark" ? "#000" : "#fff",
            },
            grid: {
              color: theme !== "dark" ? "#cdcdcd" : "gray",
            },
            ticks: {
              stepSize: 0.2,
              color: theme !== "dark" ? "black" : "white",
            },
          },
        },
        plugins: {
          datalabels: {
            display: false,
            font: {
              size: 8,
            },
            padding: 8,
            color: theme !== "dark" ? "#14069c" : "orange",
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default ChartProfessor;
