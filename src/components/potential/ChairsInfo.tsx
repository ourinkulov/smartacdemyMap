import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeContext";
import { res } from "./StatsPotential";
import { getTeachersStatistic } from "../../utils/Requests";
import Loader from "../../utils/Loader";

type props = {
  selectedChairId: string;
};

export default function ChairsInfo({ selectedChairId }: props) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [statsData, setStatsData] = useState<res>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeachersStatistic(Number(selectedChairId))
      .then((response) => {
        setStatsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedChairId]);

  return (
    <div className="px-2 h-[calc(100vh-120px)] overflow-y-auto">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <div className="bg-slate-200 dark:bg-slate-700 flex p-4 gap-4 rounded-md border-b-[6px] border-[#14059c] dark:border-toggleBackground shadow-lg">
              <div className="flex items-center justify-center">
                {theme == "dark" ? (
                  <img
                    src="./assets/professors-dark.png"
                    width={55}
                    height={55}
                  />
                ) : (
                  <img src="./assets/professors.png" width={55} height={55} />
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-3xl flex items-center gap-1 font-semibold text-[#14059c]  dark:text-toggleBackground">
                  <div>{statsData?.professor_cnt}</div>
                  <div className="text-2xl font-medium italic text-red-600">
                    {" (" +
                      (
                        ((Number(statsData?.academic_degree_phd_cnt) +
                          Number(statsData?.academic_degree_dsc_cnt)) /
                          Number(statsData?.professor_cnt)) *
                        100
                      ).toFixed(1) +
                      "%)"}
                  </div>
                </div>
                <div className="3xl:text-md max-xl:text-sm font-medium text-center">
                  {t("chairspotentialpage.professors count")}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 mt-4">
            <div className="w-1/3 flex justify-between items-center gap-2 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
              <div className="w-2/5 flex items-center justify-center">
                {theme == "dark" ? (
                  <img src="./assets/shtat-dark.png" width={50} height={50} />
                ) : (
                  <img src="./assets/shtat.png" width={50} height={50} />
                )}
              </div>
              <div className="w-3/5 h-20 flex flex-col items-center justify-center text-[#14059c]  dark:text-toggleBackground text-center">
                <div className="text-xl font-semibold">
                  {statsData?.main_emp_cnt}
                </div>
                <div className="3xl:text-md max-xl:text-sm font-medium dark:text-white">
                  {t("chairspotentialpage.main staff")}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex justify-between items-center gap-2 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
              <div className="w-2/5 flex justify-center items-center">
                {theme == "dark" ? (
                  <img
                    src="./assets/urindosh_shtat-dark.png"
                    width={60}
                    height={60}
                  />
                ) : (
                  <img
                    src="./assets/urindosh_shtat.png"
                    width={60}
                    height={60}
                  />
                )}
              </div>
              <div className="w-3/5 h-20 flex flex-col items-center text-[#14059c]  dark:text-toggleBackground text-center">
                <div className="text-xl font-semibold">
                  {statsData?.repl_emp_cnt}
                </div>
                <div className="3xl:text-md max-xl:text-sm font-medium dark:text-white">
                  {t("chairspotentialpage.replacement staff")}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex justify-between items-center gap-2 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
              <div className="w-2/5 flex justify-center items-center">
                {theme == "dark" ? (
                  <img
                    src="./assets/soatbay_shtat-dark.png"
                    width={55}
                    height={55}
                  />
                ) : (
                  <img
                    src="./assets/soatbay_shtat.png"
                    width={55}
                    height={55}
                  />
                )}
              </div>

              <div className="w-3/5 h-20 flex flex-col items-center justify-center text-[#14059c]  dark:text-toggleBackground text-center">
                <div className="text-xl font-semibold">
                  {statsData?.hourly_emp_cnt}
                </div>
                <div className="3xl:text-md max-xl:text-sm  font-medium dark:text-white">
                  {t("chairspotentialpage.hourly staff")}
                </div>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="flex flex-col">
            <div className="3xl:text-xl text-md text-center">
              {t("chairspotentialpage.with degree and title")}
            </div>
            <div className="flex justify-around gap-4 3xl:mt-4 mt-2">
              <div className="w-1/2 flex justify-center items-center gap-4 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
                <div className="w-2/5 flex justify-center items-center">
                  {theme == "dark" ? (
                    <img src="./assets/dsc-dark.png" width={55} height={55} />
                  ) : (
                    <img src="./assets/dsc.png" width={55} height={55} />
                  )}
                </div>

                <div className="w-3/5 flex flex-col text-center">
                  <div className="3xl:text-3xl text-2xl font-semibold text-[#14059c] dark:text-toggleBackground">
                    {statsData?.academic_degree_dsc_cnt}
                    <span className="text-2xl font-medium italic text-red-600 ml-1">
                      {"(" +
                        (
                          (Number(statsData?.academic_degree_dsc_cnt) /
                            Number(statsData?.professor_cnt)) *
                          100
                        ).toFixed(1) +
                        "%)"}
                    </span>
                  </div>
                  <hr />
                  <div className="">
                    {t("chairspotentialpage.science doctors")} <br /> (DSc)
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center gap-4 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
                <div className="w-2/5 flex justify-center items-center">
                  {theme == "dark" ? (
                    <img src="./assets/dsc-dark.png" width={55} height={55} />
                  ) : (
                    <img src="./assets/dsc.png" width={55} height={55} />
                  )}
                </div>

                <div className="w-3/5 flex flex-col text-center">
                  <div className="3xl:text-3xl text-2xl font-semibold text-[#14059c] dark:text-toggleBackground">
                    {statsData?.academic_rank_professor_cnt}
                    <span className="text-2xl font-medium italic text-red-600 ml-1">
                      {"(" +
                        (
                          (Number(statsData?.academic_rank_professor_cnt) /
                            Number(statsData?.professor_cnt)) *
                          100
                        ).toFixed(1) +
                        "%)"}
                    </span>
                  </div>
                  <hr />
                  <div className="">{t("professorspage.professors")}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-4 3xl:mt-4 xl:mt-2">
              <div className="w-1/2 flex justify-center items-center gap-2 py-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
                <div className="w-2/5 flex justify-center items-center">
                  {theme == "dark" ? (
                    <img src="./assets/phd-dark.png" width={50} height={50} />
                  ) : (
                    <img src="./assets/phd.png" width={50} height={50} />
                  )}
                </div>

                <div className="w-3/5 flex flex-col text-center">
                  <div className="3xl:text-3xl text-2xl font-semibold text-[#14059c] dark:text-toggleBackground">
                    {statsData?.academic_degree_phd_cnt}
                    <span className="text-2xl font-medium italic text-red-600 ml-1">
                      {"(" +
                        (
                          (Number(statsData?.academic_degree_phd_cnt) /
                            Number(statsData?.professor_cnt)) *
                          100
                        ).toFixed(1) +
                        "%)"}
                    </span>
                  </div>
                  <hr />
                  <div className="">
                    {t("chairspotentialpage.philosophy doctors")} <br /> (PhD)
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center gap-4 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
                <div className="w-2/5 flex justify-center items-center">
                  {theme == "dark" ? (
                    <img src="./assets/phd-dark.png" width={50} height={50} />
                  ) : (
                    <img src="./assets/phd.png" width={50} height={50} />
                  )}
                </div>

                <div className="w-3/5 flex flex-col text-center">
                  <div className="3xl:text-3xl text-2xl font-semibold text-[#14059c] dark:text-toggleBackground">
                    {statsData?.academic_rank_docent_cnt}
                    <span className="text-2xl font-medium italic text-red-600 ml-1">
                      {"(" +
                        (
                          (Number(statsData?.academic_rank_docent_cnt) /
                            Number(statsData?.professor_cnt)) *
                          100
                        ).toFixed(1) +
                        "%)"}
                    </span>
                  </div>
                  <hr />
                  <div className="">{t("professorspage.docents")}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-4 mt-4">
              <div className="w-1/2 flex justify-center items-center gap-4 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
                <div className="w-2/5 flex justify-center items-center">
                  {theme == "dark" ? (
                    <img src="./assets/male-dark.png" width={55} height={55} />
                  ) : (
                    <img src="./assets/male.png" width={55} height={55} />
                  )}
                </div>

                <div className="w-3/5 flex flex-col text-center">
                  <div className="3xl:text-3xl text-2xl font-semibold text-[#14059c] dark:text-toggleBackground">
                    {statsData?.male_cnt}
                    <span className="text-2xl font-medium italic text-red-600 ml-1">
                      {"(" +
                        (
                          (Number(statsData?.male_cnt) /
                            Number(statsData?.professor_cnt)) *
                          100
                        ).toFixed(1) +
                        "%)"}
                    </span>
                  </div>
                  <hr />
                  <div className="">{t("man")}</div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center gap-4 p-2 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
                <div className="w-2/5 flex justify-center items-center py-3">
                  {theme == "dark" ? (
                    <img
                      src="./assets/female-dark.png"
                      width={55}
                      height={55}
                    />
                  ) : (
                    <img src="./assets/female.png" width={55} height={55} />
                  )}
                </div>
                <div className="w-3/5 flex flex-col text-center">
                  <div className="3xl:text-3xl text-2xl  font-semibold text-[#14059c] dark:text-toggleBackground">
                    {statsData?.female_cnt}
                    <span className="text-2xl font-medium italic text-red-600 ml-1">
                      {"(" +
                        (
                          (Number(statsData?.female_cnt) /
                            Number(statsData?.professor_cnt)) *
                          100
                        ).toFixed(1) +
                        "%)"}
                    </span>
                  </div>
                  <hr />
                  <div className="">{t("woman")}</div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center py-2 px-6 bg-slate-200 dark:bg-slate-700 border-b-[6px] border-[#14059c] dark:border-toggleBackground rounded-md shadow-lg">
              <div className="flex justify-center items-center">
                {theme == "dark" ? (
                  <img
                    src="./assets/no_title-dark.png"
                    width={60}
                    height={60}
                  />
                ) : (
                  <img src="./assets/no_title.png" width={60} height={60} />
                )}
              </div>

              <div className="3xl:text-3xl text-2xl flex items-center gap-1 font-semibold text-[#14059c] dark:text-toggleBackground">
                <div>{Number(statsData?.academic_degree_ll_cnt)}</div>
                <div className="text-2xl font-medium italic text-red-600">
                  {" (" +
                    (
                      ((Number(statsData?.professor_cnt) -
                        Number(statsData?.academic_degree_phd_cnt) -
                        Number(statsData?.academic_degree_dsc_cnt)) /
                        Number(statsData?.professor_cnt)) *
                      100
                    ).toFixed(1) +
                    "%)"}
                </div>
              </div>
            </div>
            <div className="text-center 3xl:text-lg text-md mt-2">
              {t("chairspotentialpage.without degree and title")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
