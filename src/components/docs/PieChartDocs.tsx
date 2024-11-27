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
  data: any;
  incomingDoctype: any;
};

const PieChartDocs: React.FC<PieChartProps> = ({ data, incomingDoctype }) => {
  const { t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);

  const chartData: Pie = {
    labels: [t("documentspage.incoming"), t("documentspage.outgoing")],
    datasets: [
      {
        data: [data.income_cnt, data.outcome_cnt],
        backgroundColor: ["#ff8c00", "#0e3dbe"],
        borderColor: ["#ff8c00", "#0e3dbe"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full flex flex-col justify-around py-8">
      <div className="flex items-center justify-center font-semibold">
        {incomingDoctype}
      </div>
      <div className="h-full">
        <Pie
          data={chartData}
          options={{
            rotation: -120,
            maintainAspectRatio: false,
            layout: {
              padding: 0,
            },
            animation: {
              delay: 100,
              duration: 2000,
              easing: "easeInBack" as const,
            },
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  padding: 15,
                  color: theme !== "dark" ? "black" : "white",
                  font: {
                    size: 14,
                    family: "Montserrat",
                  },
                },
              },
              datalabels: {
                font: {
                  size: 18,
                  family: "Montserrat",
                },
                color: "white",
                formatter: (value, context) => {
                  const total = context.dataset.data.reduce(
                    (a: any, b: any) => a + b,
                    0
                  );
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

export default PieChartDocs;
