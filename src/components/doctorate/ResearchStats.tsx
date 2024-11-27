import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeContext";

export default function ResearchStats() {
  const { t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);

  const pieDataset = [
    { gender: t("man"), count: 88 },
    { gender: t("woman"), count: 12 },
  ];

  const fetchData = () => {
    const pieChartData = {
      labels: [pieDataset[0].gender, pieDataset[1].gender],
      datasets: [
        {
          data: [pieDataset[0].count, pieDataset[1].count],
          backgroundColor: ["#3b82f695", "#d946ef90"],
          borderColor: ["#3b82f6", "#d946ef"],
          borderWidth: 1,
        },
      ],
    };

    return { pieChartData };
  };

  const { pieChartData } = fetchData();

  const pieChartOptions = {
    rotation: -120,
    maintainAspectRatio: false,
    layout: {
      padding: 5,
    },
    animation: {
      delay: 300,
      duration: 2000,
      easing: "easeInBack" as const,
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 20,
          color: theme !== "dark" ? "black" : "white",
          font: {
            size: 16,
            family: "Montserrat",
          },
        },
      },
      datalabels: {
        color: theme !== "dark" ? "black" : "white",
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
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-6">
      <div className="text-base md:text-lg font-bold leading-tight mb-4 text-gray-900 dark:text-gray-100">
        {t("doctoratepage.researchers")}
      </div>
      <hr className="border-gray-300 dark:border-gray-600 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="h-[200px] w-[200px] bg-orange-200 text-black rounded-full flex items-center justify-center text-xl font-bold leading-6">
            {t("doctoratepage.average")} <br />
            33 {t("doctoratepage.years old")}
          </div>
          <div className="mt-4 text-base text-gray-700 dark:text-gray-200 font-medium">
            {t("doctoratepage.admission")}
          </div>
        </div>
        <div className="flex flex-col items-center text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="h-[200px] w-[200px] bg-orange-200 text-black rounded-full flex items-center justify-center text-xl font-bold leading-6">
            {t("doctoratepage.average")} <br />
            35 {t("doctoratepage.years old")}
          </div>
          <div className="mt-4 text-base text-gray-700 dark:text-gray-200 font-medium">
            {t("doctoratepage.thesis defense")}
          </div>
        </div>
        <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="w-full h-full">
            <Pie data={pieChartData} options={pieChartOptions as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
