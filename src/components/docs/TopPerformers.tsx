import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDocBestEmp, getDocWeakEmp } from "../../utils/Requests";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";
import { IDataDashboard } from "redux/dataStored/userReducer";

export default function TopPerformers() {
  const { i18n, t } = useTranslation<string>();
  const [bestEmps, setBestEmps] = useState<any>([]);
  const [weakEmps, setWeakEmps] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  useEffect(() => {
    getDocBestEmp()
      .then((response: any) => {
        setBestEmps(response.data.rows);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getDocWeakEmp()
      .then((response: any) => {
        setWeakEmps(response.data.rows);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className={`h-full flex max-2xl:flex-col gap-2 ${
        isCollapsed ? "w-[calc(100vw-112px)]" : "w-[calc(100vw-252px)]"
      }`}
    >
      <div className="p-2 w-1/2 max-2xl:w-full h-full bg-white dark:bg-slate-700 rounded-lg shadow-md">
        <div className="text-base md:text-lg font-semibold leading-5">
          {t("documentspage.top performers") as string}
        </div>
        <hr className="p-1" />
        <div className="h-[calc(100vh-280px)] overflow-y-auto">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <table className="h-full w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300">
              <thead className="text-xs text-white uppercase bg-[#14059c] dark:bg-toggleBackground">
                <tr className="text-center">
                  <th scope="col" className="">
                    {t("documentspage.photo") as string}
                  </th>
                  <th scope="col" className="2xl:hidden 3xl:table-cell">
                    {t("documentspage.structural organization") as string}
                  </th>
                  <th scope="col" className="">
                    {t("bachelorpage.fio") as string}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("bachelorpage.quantity") as string}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("all") as string}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("bachelorpage.percent") as string}
                  </th>
                </tr>
              </thead>
              <tbody className="h-full">
                {bestEmps
                  .filter((x: any) => x?.percent > 0)
                  .slice(0, 5)
                  .map((emp: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className={`${
                          (index + 4) % 2 == 0
                            ? "bg-slate-100 dark:bg-slate-500"
                            : "bg-white dark:bg-transparent"
                        }  h-auto text-black dark:text-white`}
                      >
                        <th className="text-center font-normal w-36">
                          <img
                            src={`http://smart.akadmvd.uz:8088/api/hemis/teacher-img?teacher_id=${emp?.id}`}
                            alt={emp!.fio}
                            className="w-[85px] h-[110px] rounded-lg mx-6"
                          />
                        </th>
                        <th className="text-center font-normal 2xl:hidden 3xl:table-cell">
                          {emp.org}
                        </th>
                        <th className="text-center font-normal">{emp.fio}</th>
                        <th className="text-center font-normal">
                          {emp.executed_cnt}
                        </th>
                        <th className="text-center font-normal">
                          {emp.all_cnt}
                        </th>
                        <th className="text-center font-normal">
                          {emp.percent}
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="p-2 w-1/2 max-2xl:w-full h-full bg-white dark:bg-slate-700 rounded-lg shadow-md">
        <div className="text-base md:text-lg font-semibold leading-5">
          {t("documentspage.weak performers") as string}
        </div>
        <hr className="p-1" />

        <div className="h-[calc(100vh-280px)] overflow-y-auto">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <table className="h-full w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300">
              <thead className="text-xs text-white uppercase bg-[#14059c] dark:bg-toggleBackground">
                <tr className="text-center">
                  <th scope="col" className="">
                    {t("documentspage.photo") as string}
                  </th>
                  <th scope="col" className="2xl:hidden 3xl:table-cell">
                    {t("documentspage.structural organization") as string}
                  </th>
                  <th scope="col" className="">
                    {t("bachelorpage.fio") as string}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("bachelorpage.quantity") as string}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("all") as string}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("bachelorpage.percent") as string}
                  </th>
                </tr>
              </thead>
              <tbody className="h-full">
                {weakEmps
                  .filter((x: any) => x.percent > 0)
                  .slice(0, 5)
                  .reverse()
                  .map((emp: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className={`${
                          (index + 4) % 2 == 0
                            ? "bg-slate-100 dark:bg-slate-500"
                            : "bg-white dark:bg-transparent"
                        }  h-auto text-black dark:text-white`}
                      >
                        <th className="text-center font-normal w-36">
                          <img
                            src={`http://smart.akadmvd.uz:8088/api/hemis/teacher-img?teacher_id=${emp?.id}`}
                            alt={emp!.fio}
                            className="w-[85px] h-[110px] rounded-lg mx-6"
                          />
                        </th>
                        <th className="text-center font-normal 2xl:hidden 3xl:table-cell">
                          {emp.org}
                        </th>
                        <th className="text-center font-normal">{emp.fio}</th>
                        <th className="text-center font-normal">
                          {emp.not_executed_cnt}
                        </th>
                        <th className="text-center font-normal">
                          {emp.all_cnt}
                        </th>
                        <th className="text-center font-normal">
                          {emp.percent}
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
