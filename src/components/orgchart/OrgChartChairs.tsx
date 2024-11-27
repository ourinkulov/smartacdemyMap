import { useEffect, useState } from "react";
import { getSmartChairsInfo } from "../../utils/Requests";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

type Response = {
  id: number;
  teachers_cnt: number;
  chair_name: string;
  teachers_ball: number;
  academic_degree_dsc_cnt: number;
  academic_degree_phd_cnt: number;
  academic_degree_ll_cnt: number;
};

export default function OrgChartChairs() {
  const [chairsInfo, setChairsInfo] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    getSmartChairsInfo("teachers_ball")
      .then((response) => {
        setChairsInfo(response.data.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <div className="overflow-y-auto h-full">
      {!isLoading ? (
        <table className="h-full w-full text-sm text-left text-black rtl:text-right  dark:text-gray-200 ">
          <thead className="bg-[#14059c] dark:bg-toggleBackground text-md font-normal text-white dark:text-white">
            <tr>
              <th scope="col" className="py-3 text-center rounded-tl-lg">
                {t("bachelorpage.rating") as string}
              </th>
              <th scope="col" className="w-80 py-3 text-center">
                {t("structurepage.chair_name") as string}
              </th>
              <th scope="col" className="py-3 text-center">
                {t("structurepage.number_of_teachers") as string}
              </th>
              <th scope="col" className="px-2 py-3 text-center rounded-tr-lg">
                {t("structurepage.score") as string}
              </th>
            </tr>
          </thead>
          <tbody>
            {chairsInfo?.map((chair: any, index: number) => {
              return (
                <tr className="border-b" key={index}>
                  <th className="text-center py-1.5 font-normal">{chair.id}</th>
                  <th className="text-left font-normal">{chair.chair_name}</th>
                  <th className="text-center font-normal">
                    {chair.teachers_cnt}
                  </th>
                  <th className="flex justify-center items-center h-full w-full">
                    <div className="rounded-lg bg-slate-200 dark:bg-slate-500 px-2 py-1 w-16 text-center">
                      {chair.teachers_ball}
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
