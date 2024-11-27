import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";
import { ThemeContext } from "../../theme/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { getScienceDynamics } from "../../utils/Requests";

export default function DynamicsStats() {
  const [dynamicsData, setDynamicsData] = useState<any>([]);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getScienceDynamics()
      .then((response) => {
        setIsLoading(true);
        setDynamicsData(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  const dataLastFour = dynamicsData.slice(-4).reduce(
    (accumulator: any, currentValue: any) => {
      return {
        docent_cnt: accumulator.docent_cnt + currentValue.docent_cnt,
        dsc_cnt: accumulator.dsc_cnt + currentValue.dsc_cnt,
        phd_cnt: accumulator.phd_cnt + currentValue.phd_cnt,
        professor_cnt: accumulator.professor_cnt + currentValue.professor_cnt,
        year: currentValue.year,
      };
    },
    { docent_cnt: 0, dsc_cnt: 0, phd_cnt: 0, professor_cnt: 0, year: 0 }
  );

  const dataAll = dynamicsData.reduce(
    (accumulator: any, currentValue: any) => {
      return {
        docent_cnt: accumulator.docent_cnt + currentValue.docent_cnt,
        dsc_cnt: accumulator.dsc_cnt + currentValue.dsc_cnt,
        phd_cnt: accumulator.phd_cnt + currentValue.phd_cnt,
        professor_cnt: accumulator.professor_cnt + currentValue.professor_cnt,
        year: currentValue.year,
      };
    },
    { docent_cnt: 0, dsc_cnt: 0, phd_cnt: 0, professor_cnt: 0, year: 0 }
  );

  return (
    <div className="w-full h-full px-2">
      <div className="w-full flex items-center justify-between border-b border-[#14059c] dark:border-white">
        <div className="font-semibold uppercase line-clamp-1">
          {t("dynamics last four years")}
        </div>
        <div className="h-9"></div>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-8 w-full h-[calc(100%-40px)] overflow-y-auto">
          <div className="w-full dark:bg-slate-700 flex justify-around py-4 rounded-md">
            <div className="flex items-center justify-center w-[70px] h-[70px]">
              {theme == "dark" ? (
                <img src="./assets/dsc-dark.png" width={70} height={70} />
              ) : (
                <img src="./assets/dsc.png" width={70} height={70} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl flex items-center gap-2 font-semibold text-[#14059c]  dark:text-toggleBackground">
                <div className="text-3xl">{dataLastFour.dsc_cnt}</div>
                <div className="text-2xl font-medium italic text-red-600">
                  {" (" +
                    `${
                      dataLastFour.dsc_cnt
                        ? (
                            (dataLastFour.dsc_cnt / dataAll.dsc_cnt) *
                            100
                          ).toFixed(0)
                        : "0"
                    }` +
                    "%)"}
                </div>

                <FontAwesomeIcon
                  className="text-[#06a94d] mx-2"
                  icon={faArrowTrendUp}
                  size="lg"
                />
              </div>
              <div className="3xl:text-xl max-xl:text-sm font-medium text-center">
                {t("chairspotentialpage.science doctors")}
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-slate-700 flex justify-around py-4 rounded-md">
            <div className="flex items-center justify-center w-[70px] h-[70px]">
              {theme == "dark" ? (
                <img src="./assets/phd-dark.png" width={70} height={70} />
              ) : (
                <img src="./assets/phd.png" width={70} height={70} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl flex items-center gap-2 font-semibold text-[#14059c]  dark:text-toggleBackground">
                <div className="text-3xl">{dataLastFour.phd_cnt}</div>
                <div className="text-2xl font-medium italic text-red-600">
                  {" (" +
                    `${
                      dataLastFour.phd_cnt
                        ? (
                            (dataLastFour.phd_cnt / dataAll.phd_cnt) *
                            100
                          ).toFixed(0)
                        : "0"
                    }` +
                    "%)"}
                </div>

                <FontAwesomeIcon
                  className="text-[#06a94d] mx-2"
                  icon={faArrowTrendUp}
                  size="lg"
                />
              </div>
              <div className="3xl:text-xl max-xl:text-sm font-medium text-center">
                {t("chairspotentialpage.philosophy doctors")}
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-slate-700 flex justify-around py-4 rounded-md">
            <div className="flex items-center justify-center w-[70px] h-[70px]">
              {theme == "dark" ? (
                <img src="./assets/dsc-dark.png" width={70} height={70} />
              ) : (
                <img src="./assets/dsc.png" width={70} height={70} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl flex items-center gap-2 font-semibold text-[#14059c]  dark:text-toggleBackground">
                <div className="text-3xl">{dataLastFour.professor_cnt}</div>
                <div className="text-2xl font-medium italic text-red-600">
                  {" (" +
                    `${
                      dataLastFour.professor_cnt
                        ? (
                            (dataLastFour.professor_cnt /
                              dataAll.professor_cnt) *
                            100
                          ).toFixed(0)
                        : "0"
                    }` +
                    "%)"}
                </div>

                <FontAwesomeIcon
                  className="text-[#06a94d] mx-2"
                  icon={faArrowTrendUp}
                  size="lg"
                />
              </div>
              <div className="3xl:text-xl max-xl:text-sm font-medium text-center">
                {t("professorspage.professors")}
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-slate-700 flex justify-around py-4 rounded-md">
            <div className="flex items-center justify-center w-[70px] h-[70px]">
              {theme == "dark" ? (
                <img src="./assets/phd-dark.png" width={70} height={70} />
              ) : (
                <img src="./assets/phd.png" width={70} height={70} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl flex items-center gap-2 font-semibold text-[#14059c]  dark:text-toggleBackground">
                <div className="text-3xl">{dataLastFour.docent_cnt}</div>
                <div className="text-2xl font-medium italic text-red-600">
                  {" (" +
                    `${
                      dataLastFour.docent_cnt
                        ? (
                            (dataLastFour.docent_cnt / dataAll.docent_cnt) *
                            100
                          ).toFixed(0)
                        : "0"
                    }` +
                    "%)"}
                </div>

                <FontAwesomeIcon
                  className="text-[#06a94d] mx-2"
                  icon={faArrowTrendUp}
                  size="lg"
                />
              </div>
              <div className="3xl:text-xl max-xl:text-sm font-medium text-center">
                {t("professorspage.docents")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
