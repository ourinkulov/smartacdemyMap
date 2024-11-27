import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeContext";
Chart.register(...registerables);
Chart.defaults.font.family = "Montserrat";

export default function BarChartDocs(props: any) {
  // const { i18n, t } = useTranslation<string>();
  const { data, label, setIncomingDoctype } = props;
  const { theme } = useContext(ThemeContext);

  function generateBackgroundColors(data: any) {
    return data.map((item: any) => {
      if (item > 100) {
        return "#00df00";
      } else if (item > 80) {
        return "#00dd00";
      } else if (item > 50) {
        return "#00dd00";
      } else if (item > 20) {
        return "#00ff00";
      } else if (item > 10) {
        return "#66ff66";
      } else if (item > 5) {
        return "#99ff99";
      } else {
        return "#ccffcc";
      }
    });
  }

  const dataDocTypes = {
    labels: label,
    datasets: [
      {
        label: null,
        data: data,
        fill: "#14059c",
        backgroundColor: generateBackgroundColors(data),
        borderColor: "rgb(0, 100, 0)",
        tension: 0.1,
      },
    ],
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    layout: {
      responsive: false,
      padding: {
        left: 0,
        right: 20,
        top: 5,
        bottom: 5,
      },
    },
    indexAxis: "y" as const,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: theme !== "dark" ? "black" : "white",
          tickColor: theme !== "dark" ? "black" : "white",
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            family: "Montserrat",
          },
          padding: 0,
          stepSize: 1,
          color: theme !== "dark" ? "black" : "white",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme !== "dark" ? "green" : "white",
          display: true,
          drawOnChartArea: true,
        },
        stacked: true,
        ticks: {
          position: "right",
          font: {
            family: "Montserrat",
          },
          padding: 0,
          autoSkip: false,
          color: theme !== "dark" ? "black" : "white",
        },
      },
    },
    onClick: (event: any, elements: any) => {
      const clickedBarIndex = elements[0].index;
      const clickedBarLabel = label[clickedBarIndex];
      setIncomingDoctype(clickedBarLabel);
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
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
        anchor: "center" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
        font: {
          family: "Montserrat",
          size: 12,
        },
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
    <>
      <Bar data={dataDocTypes as any} options={barChartOptions} />
    </>
  );
}
