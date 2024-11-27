import {
  faCircleCheck,
  faClockFour,
  faEnvelopesBulk,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IDataDashboard } from "redux/dataStored/userReducer";
import { getDocByDepartment } from "../../utils/Requests";
import PieChartByOrgs from "./PieChartByOrgs";
import Loader from "../../utils/Loader";

export default function ResultsByOrgs() {
  const { i18n, t } = useTranslation<string>();

  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  const [dataDoc, setDataDoc] = useState<any>([]);
  const [selectedDept, setSelectedDept] = useState<string>(
    "O'quv uslubiy boshqarma"
  );
  const [selectedDeptData, setSelectedDeptData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  let today = new Date();
  let firstDay = new Date(new Date().getFullYear(), 0, 1);

  const [toDate, setToDate] = useState<any>(today);
  const [fromDate, setFromDate] = useState<any>(firstDay);

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
        setDataDoc(response.data.rows);
        setSelectedDeptData(response.data?.rows[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language, fromDate, toDate]);

  useEffect(() => {
    let temp = dataDoc?.filter((dept: any) =>
      dept.department_name.includes(selectedDept)
    );
    if (temp[0]) {
      setSelectedDeptData(temp[0]);
    }
  }, [selectedDept]);

  return (
    <div>
      <div className="rounded-lg p-2 bg-white dark:bg-slate-700 shadow-md flex justify-between items-center px-2 mb-2">
        <div className="text-base md:text-lg font-semibold leading-5">
          <span className="line-clamp-1">
            {t("documentspage.results by orgs") as string}
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
              className="dark:text-white mx-2 text-sm bg-transparent dark:bg-slate-700 hover:cursor-pointer"
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

      <div
        className={`${
          isCollapsed ? "h-[calc(100vh-280px)]" : "h-[calc(100vh-280px)]"
        } flex gap-2`}
      >
        <div className="w-2/5 h-full p-2 bg-white dark:bg-slate-700 shadow-md rounded-lg">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="font-semibold pb-1 text-center">
                <div className="line-clamp-1">
                  {t("documentspage.list of departments") as string}
                </div>
              </div>
              <div className="w-full h-[calc(100%-24px)] overflow-y-auto flex flex-col gap-2">
                {dataDoc
                  ?.filter(
                    (item: any) => item.structure_type_name != "Rahbariyat" 
                  )
                  .map((label: any, index: number) => (
                    <div
                      key={index}
                      className={`hover:border-slate-400  hover:cursor-pointer hover:bg-gradient-to-r dark:hover:from-slate-500 dark:hover:bg-gradient-to-r hover:from-slate-200  to-blue-0 w-full text-sm text-gray-700 dark:text-white border-l-2  pl-2 ${
                        label?.structure_type_name == "Fakultet"
                          ? "border-green-400 dark:from-green-700  bg-gradient-to-r from-green-200 to-green-0"
                          : label?.structure_type_name == "Kafedra"
                          ? "border-blue-400 dark:from-blue-700 bg-gradient-to-r from-blue-200 to-blue-0"
                          : "border-yellow-400 dark:from-yellow-700 bg-gradient-to-r from-yellow-200 to-yellow-0"
                      }`}
                      onClick={() => setSelectedDept(label?.department_name)}
                    >
                      {label?.department_name}
                    </div>
                  ))}{" "}
              </div>
            </>
          )}
        </div>
        <div className="max-xl:w-3/5 w-2/5 h-full p-2 bg-white dark:bg-slate-700 shadow-md rounded-lg">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <PieChartByOrgs
              data={selectedDeptData}
              selectedDept={selectedDept}
            />
          )}
        </div>
        <div className="max-xl:hidden w-1/5 h-full p-4 bg-white dark:bg-slate-700 shadow-md rounded-lg flex flex-col gap-4 items-center">
          {isLoading ? (
            <div className="h-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="w-full h-[25%] flex justify-between items-center rounded-lg border border-[#0e3dbe]">
                <div className="w-1/3 h-full flex items-center justify-center bg-[#0e3dbe]">
                  <FontAwesomeIcon
                    icon={faEnvelopesBulk}
                    size={"2xl"}
                    color={"white"}
                  />
                </div>
                <div className="w-2/3 h-full rounded-r-lg flex flex-col items-center justify-center gap-2 dark:bg-white dark:text-black">
                  <div className="text-center">
                    {t("documentspage.all incoming documents")}
                  </div>
                  <div className="text-4xl font-semibold">
                    {selectedDeptData?.income_cnt}
                  </div>
                </div>
              </div>
              <div className="w-full h-[25%] flex justify-between items-center rounded-lg border border-[#cccccc]">
                <div className="w-1/3 h-full flex items-center justify-center bg-[#cccccc] rounded-l-lg">
                  <FontAwesomeIcon icon={faSpinner} size={"2xl"} />
                </div>
                <div className="w-2/3 h-full rounded-r-lg flex flex-col items-center justify-center gap-2 dark:bg-white dark:text-black">
                  <div className="text-center">
                    {t("documentspage.in process")}
                  </div>
                  <div className="text-4xl font-semibold text-center">
                    {selectedDeptData?.process_cnt}
                  </div>
                </div>
              </div>
              <div className="w-full h-[25%] flex justify-between items-center rounded-lg border border-[#ff8c00]">
                <div className="w-1/3 h-full flex items-center justify-center bg-[#ff8c00] rounded-l-lg">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size={"2xl"}
                    color="white"
                  />
                </div>
                <div className="w-2/3 h-full rounded-r-lg flex flex-col items-center justify-center gap-2 dark:bg-white dark:text-black">
                  <div className="text-center">
                    {t("documentspage.completed documents")}
                  </div>
                  <div className="text-4xl font-semibold flex items-center">
                    {selectedDeptData?.executed_cnt}
                  </div>
                </div>
              </div>
              <div className="w-full h-[25%] flex justify-between items-center rounded-lg border border-[#ffcc00]">
                <div className="w-1/3 h-full flex items-center justify-center bg-[#ffcc00] rounded-l-lg">
                  <FontAwesomeIcon
                    icon={faClockFour}
                    size={"2xl"}
                    color="white"
                  />
                </div>
                <div className="w-2/3 h-full rounded-r-lg flex flex-col items-center justify-center gap-2 dark:bg-white dark:text-black">
                  <div className="text-center">
                    {t("documentspage.deadline passed")}
                  </div>
                  <div className="text-4xl font-semibold ">
                    {selectedDeptData?.expired_cnt}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
