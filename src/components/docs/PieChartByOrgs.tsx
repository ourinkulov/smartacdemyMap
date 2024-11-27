import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
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
  data: any;
  selectedDept: string;
};

const PieChartByOrgs: React.FC<PieChartProps> = ({ data, selectedDept }) => {
  const { t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);

  const chartData: Pie = {
    labels: [
      t("documentspage.in process"),
      t("documentspage.completed documents"),
      t("documentspage.deadline passed"),
    ],
    datasets: [
      {
        data: [data.process_cnt, data.executed_cnt, data.expired_cnt],
        backgroundColor: ["#cccccc", "#ff8c00", "#ffcc00"],
        borderColor: ["#cccccc", "#ff8c00", "#ffcc00"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full flex flex-col justify-around">
      <div className="w-full flex items-center justify-center font-semibold">
        {selectedDept}
      </div>
      <div className="h-[80%]">
        <Doughnut
          data={chartData}
          options={{
            rotation: 0,
            maintainAspectRatio: false,
            layout: {
              padding: 0,
            },
            animation: {
              delay: 200,
              duration: 1000,
              easing: "easeInBack" as const,
            },
            responsive: true,
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
              datalabels: {
                font: {
                  size: 14,
                  family: "Montserrat",
                },
                color: "black",
                formatter: (value, context) => {
                  const total = context.dataset.data.reduce(
                    (a: any, b: any) => a + b,
                    0
                  );

                  if (!total) {
                    return t("bachelorpage.not_found_data");
                  }
                  const percentage = ((value / total) * 100).toFixed(2);
                  return `     ${value}\n(${percentage}%)`;
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChartByOrgs;
