import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IDataDashboard } from "redux/dataStored/userReducer";
import { getDocByDepartment } from "../../utils/Requests";
import { Bar } from "react-chartjs-2";
import { ThemeContext } from "../../theme/ThemeContext";
import Loader from "../../utils/Loader";

export default function ControlledDocs() {
  const { i18n, t } = useTranslation<string>();
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  let today = new Date();
  let firstDay = new Date(new Date().getFullYear(), 0, 1);

  const [toDate, setToDate] = useState<any>(today);
  const [fromDate, setFromDate] = useState<any>(firstDay);
  const [dataRaw, setDataRaw] = useState<any>([]);
  const [dataDoc, setDataDoc] = useState<any>([]);
  const [filter, setFilter] = useState<string>("");

  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  const handleFromDateChange = (e: any) => {
    setFromDate(new Date(e.target.value));
  };

  const handleToDateChange = (e: any) => {
    setToDate(new Date(e.target.value));
  };

  useEffect(() => {
    let fromDateConverted = fromDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");

    let toDateConverted = toDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");

    getDocByDepartment(fromDateConverted, toDateConverted)
      .then((response) => {
        const filteredManagement = response.data.rows?.filter(
          (item: any) => item.structure_type_name != "Rahbariyat"
        );

        if (filter) {
          setDataDoc(
            filteredManagement?.filter(
              (x: any) => x.structure_type_name == filter
            )
          );
        } else {
          setDataDoc(filteredManagement);
          setDataRaw(filteredManagement);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language, fromDate, toDate]);

  useEffect(() => {
    if (filter && filter != "Boshqa") {
      setDataDoc(dataRaw.filter((x: any) => x.structure_type_name == filter));
    } else if (filter && filter == "Boshqa") {
      setDataDoc(
        dataRaw.filter(
          (x: any) =>
            x.structure_type_name != "Fakultet" &&
            x.structure_type_name != "Kafedra"
        )
      );
    } else {
      setDataDoc(dataRaw);
    }
  }, [filter]);

  function generateBackgroundColors(data: any) {
    return data.map((item: any) => {
      if (item > 100) {
        return "#ff8c00";
      } else if (item > 80) {
        return "#ffa856";
      } else if (item > 50) {
        return "#ffc156";
      } else if (item > 20) {
        return "#ffcc00";
      } else if (item > 10) {
        return "#ffdb4d";
      } else if (item > 5) {
        return "#ffe680";
      } else {
        return "#fff2b3";
      }
    });
  }

  const labelBar = dataDoc?.map((item: any) => {
    if (item.department_name.length > 25) {
      return item.department_name.slice(0, 25);
    } else {
      return item.department_name;
    }
  });
  const dataBar = dataDoc?.map((item: any) => item.all_cnt);

  const dataDocTypes = {
    labels: labelBar,
    datasets: [
      {
        label: null,
        data: dataBar,
        backgroundColor: generateBackgroundColors(dataBar),
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
          color: theme !== "dark" ? "gray" : "white",
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
    onClick: (event: any, elements: any) => {},
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
        anchor: "end" as const,
        offset: -20,
        color: theme !== "dark" ? "black" : "white",
        font: {
          family: "Montserrat",
          size: 11,
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
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
      <div className="flex justify-between items-center px-2">
        <div className="text-base md:text-lg font-semibold leading-5">
          <span className="line-clamp-1">
            {t("documentspage.controlled documents distribution") as string}
          </span>
        </div>

        <div className="flex gap-2">
          <label
            htmlFor="fromDate"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            {t("mainpage.lesson_date") as string}:
            <input
              id="fromDate"
              type="date"
              className="mx-2 text-sm bg-transparent dark:bg-slate-700 hover:cursor-pointer"
              value={
                fromDate != null
                  ? fromDate.toLocaleDateString("en-CA")
                  : new Date()
              }
              onChange={handleFromDateChange}
            />
          </label>
          <label
            htmlFor="toDate"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            <input
              id="toDate"
              type="date"
              className="text-sm bg-transparent dark:bg-slate-700 hover:cursor-pointer"
              value={
                toDate != null ? toDate.toLocaleDateString("en-CA") : new Date()
              }
              onChange={handleToDateChange}
            />
          </label>
        </div>
      </div>
      <hr className="p-1" />

      <div
        className={`${
          isCollapsed
            ? "w-[calc(100vw-132px)] h-[calc(100vh-140px)]"
            : "w-[calc(100vw-272px)] h-[calc(100vh-140px)]"
        } flex flex-col gap-4`}
      >
        {isLoading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="h-[calc(100%-100px)]">
              <Bar data={dataDocTypes as any} options={barChartOptions} />
            </div>
            <div className="flex gap-4 w-full items-center justify-center">
              <button
                className={`w-48  hover:bg-red-300 py-4 rounded-lg ${
                  filter == ""
                    ? "border border-red-400 bg-transparent"
                    : "border bg-red-400"
                }`}
                onClick={() => setFilter("")}
              >
                {t("documentspage.general")}
              </button>
              <button
                className={`w-48  hover:bg-yellow-300 py-4 rounded-lg ${
                  filter == "Fakultet"
                    ? "border border-yellow-400 bg-transparent"
                    : "border bg-yellow-400"
                }`}
                onClick={() => setFilter("Fakultet")}
              >
                {t("documentspage.faculties")}
              </button>
              <button
                className={`w-48  hover:bg-green-300 py-4 rounded-lg ${
                  filter == "Kafedra"
                    ? "border border-green-400 bg-transparent"
                    : "border bg-green-400"
                }`}
                onClick={() => setFilter("Kafedra")}
              >
                {t("documentspage.chairs")}
              </button>
              <button
                className={`w-48  hover:bg-blue-300 py-4 rounded-lg ${
                  filter == "Boshqa"
                    ? "border border-blue-400 bg-transparent"
                    : "border bg-blue-400"
                }`}
                onClick={() => setFilter("Boshqa")}
              >
                <div className="line-clamp-1">
                  {t("documentspage.units and services")}
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
