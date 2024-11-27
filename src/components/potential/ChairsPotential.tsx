import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSmartChairsInfo } from "../../utils/Requests";
import ChairsInfo from "./ChairsDrawer";
import Loader from "../../utils/Loader";

type Response = {
  id: number;
  teachers_cnt: number;
  chair_name: string;
  kaf_id: number;
  teachers_ball: number;
  academic_degree_dsc_cnt: number;
  academic_degree_phd_cnt: number;
  academic_degree_ll_cnt: number;
  chair_potential: number;
};

export default function ChairsPotential() {
  const [chairsInfo, setChairsInfo] = useState<Response[]>([]);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChairId, setSelectedChairId] = useState<string>("-1");
  const { i18n, t } = useTranslation<string>();

  const handleChairChange = (event: any) => {
    event.preventDefault();
    setSelectedChairId(event.currentTarget.id);

    setShowDrawer(true);
  };

  useEffect(() => {
    getSmartChairsInfo("chair_potential")
      .then((response) => {
        setChairsInfo(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <>
      <div className="w-full flex items-center justify-between border-b border-[#14059c] dark:border-white">
        <div className="font-semibold uppercase line-clamp-1">
          {t("chairspotentialpage.chairs scientific potential ranking")}
        </div>
        <div className="h-9"></div>
      </div>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full overflow-y-auto pr-2">
          {chairsInfo && (
            <table className="h-full w-full text-sm text-left text-black rtl:text-right dark:text-gray-200">
              <thead className="text-md">
                <tr>
                  <th scope="col" className="py-3 text-center rounded-tl-lg">
                    {t("bachelorpage.rating") as string}
                  </th>
                  <th scope="col" className="py-3 text-center">
                    {t("structurepage.chair_name") as string}
                  </th>
                  <th scope="col" className="py-3 text-center">
                    {t("structurepage.number_of_teachers") as string}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    {(t("scientific potential") as string) + " (%)"}
                  </th>
                  <th scope="col" className="py-3 text-center">
                    <div className="flex items-center justify-center line-clamp-1">
                      {t("chairspotentialpage.science doctors")} /{" "}
                      {t("chairspotentialpage.philosophy doctors")} /{" "}
                      {t("chairspotentialpage.not available")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {chairsInfo.map((chair: Response, index: number) => {
                  return (
                    <tr
                      id={chair.kaf_id ? chair.kaf_id.toString() : "-1"}
                      className={`h-full border-b hover:bg-gray-200 hover:dark:bg-gray-600 hover:cursor-pointer ${
                        selectedChairId == chair.kaf_id?.toString()
                          ? "bg-green-100 dark:bg-toggleBackground dark:text-black"
                          : ""
                      }`}
                      key={index}
                      onClick={(e: any) => handleChairChange(e)}
                    >
                      <th className="text-center py-1.5 font-normal">
                        {index + 1}
                      </th>
                      <th className="text-left font-normal">
                        {chair.chair_name}
                      </th>
                      <th className="text-center font-normal">
                        {chair.teachers_cnt}
                      </th>
                      <th className="flex justify-center items-center h-full w-full px-4">
                        <div className="py-1 w-16 text-center">
                          {chair.chair_potential.toFixed(1)}
                        </div>
                      </th>
                      <th className="h-full px-2 font-normal">
                        <div className="flex h-full w-full">
                          <div
                            className="h-full flex items-center justify-center bg-green-400 hover:bg-green-600"
                            style={{
                              width: `${chair.academic_degree_dsc_cnt * 15}px`,
                            }}
                          >
                            <span className="text-[12px]">
                              {chair.academic_degree_dsc_cnt
                                ? chair.academic_degree_dsc_cnt
                                : undefined}
                            </span>
                          </div>
                          <div
                            className="h-full flex items-center justify-center bg-pink-400 hover:bg-pink-600"
                            style={{
                              width: `${chair.academic_degree_phd_cnt * 12}px`,
                            }}
                          >
                            <span className="text-[12px]">
                              {chair.academic_degree_phd_cnt
                                ? chair.academic_degree_phd_cnt
                                : undefined}
                            </span>
                          </div>
                          <div
                            className="h-full flex items-center justify-center  bg-purple-400 hover:bg-purple-600"
                            style={{
                              width: `${chair.academic_degree_ll_cnt * 8}px`,
                            }}
                          >
                            <span className="text-[12px]">
                              {chair.academic_degree_ll_cnt
                                ? chair.academic_degree_ll_cnt
                                : undefined}
                            </span>
                          </div>
                        </div>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      <ChairsInfo
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        selectedChairId={selectedChairId}
      />
    </>
  );
}
