import PieChartDocs from "../../components/docs/PieChartDocs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getDocType, getDocTypePie } from "../../utils/Requests";
import { useSelector } from "react-redux";
import { IDataDashboard } from "redux/dataStored/userReducer";
import BarChartDocs from "./BarChartDocs";
import Loader from "../../utils/Loader";

export default function IncomingDocs() {
  const { i18n, t } = useTranslation<string>();
  const [dataDocType, setDataDocType] = useState<any>([]);
  const [dataDocTypePie, setDataDocTypePie] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  let today = new Date();
  let firstDay = new Date(new Date().getFullYear(), 0, 1);

  const [toDate, setToDate] = useState<any>(today);
  const [fromDate, setFromDate] = useState<any>(firstDay);
  const [incomingDoctype, setIncomingDoctype] = useState<any>("XAT");

  const handleFromDateChange = (e: any) => {
    setFromDate(new Date(e.target.value));
  };

  const handleToDateChange = (e: any) => {
    setToDate(new Date(e.target.value));
  };

  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

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

    getDocType(fromDateConverted, toDateConverted)
      .then((response) => {
        setDataDocType(response.data.rows);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language, fromDate, toDate]);

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

    getDocTypePie(fromDateConverted, toDateConverted, incomingDoctype).then(
      (response) => {
        setDataDocTypePie(response.data);
      }
    );
  }, [i18n.language, fromDate, toDate, incomingDoctype]);

  const labelBar = dataDocType?.map((item: any) => item.kiruvchi_hujjat_turi);
  const dataBar = dataDocType?.map((item: any) => item.doc_cnt);

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
      <div className="flex justify-between items-center px-2">
        <div className="text-base md:text-lg font-semibold leading-5">
          <span className="line-clamp-1">
            {t("documentspage.incoming documents types") as string}
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
            ? "w-[calc(100vw-132px)] h-[calc(100vh-280px)]"
            : "w-[calc(100vw-272px)] h-[calc(100vh-280px)]"
        } flex items-center`}
      >
        {isLoading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="h-full w-2/5 flex flex-col justify-around items-center max-xl:hidden">
              <PieChartDocs
                data={dataDocTypePie}
                incomingDoctype={incomingDoctype}
              />
            </div>
            <div className="h-full w-3/5 max-xl:w-full">
              <BarChartDocs
                data={dataBar}
                label={labelBar}
                setIncomingDoctype={setIncomingDoctype}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
