import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeContext";
Chart.register(...registerables);
Chart.register(ChartDataLabels);

type Pie = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

type PieChartProps = {
  data: number[];
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const { t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);

  const chartData: Pie = {
    labels: [t("bachelorpage.educational"), t("bachelorpage.scientific")],
    datasets: [
      {
        data,
        backgroundColor: ["#FFDD95", "#86A7FC"],
        borderColor: ["#FFDD95", "#86A7FC"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
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
            display: true,
            position: "bottom",
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
            color: "black",
            formatter: (value) => {
              return `${value}%`;
            },
          },
        },
      }}
    />
  );
};

export default PieChart;
