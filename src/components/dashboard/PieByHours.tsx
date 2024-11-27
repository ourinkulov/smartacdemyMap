import {
  faLayerGroup,
  faFlask,
  faJetFighterUp,
  faMagnifyingGlass,
  faMarker,
  faPersonRunning,
  faTents,
} from "@fortawesome/free-solid-svg-icons";
import Doughnuts from "../../components/dashboard/PieChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getActivities } from "../../utils/Requests";

type PieByHoursProps = {
  educationTypeId: number;
};

export default function PieByHours(props: PieByHoursProps) {
  const { educationTypeId } = props;
  const { i18n, t } = useTranslation<string>();
  const [activitiesPercentage, setActiviesPercentage] = useState<number[]>([
    0, 0,
  ]);

  useEffect(() => {
    getActivities(educationTypeId).then((response) => {
      setActiviesPercentage([
        response.data.practical,
        response.data.theoretical,
      ]);
    });
  }, [i18n.language]);

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
      <div className="text-base md:text-lg font-semibold leading-5">
        {t("bachelorpage.activities_by_hour") as string}
      </div>
      <hr className="p-1" />

      <div className="flex text-center">
        <div className="w-1/3 grid gap-2 lg:gap-4 grid-cols-1 lg:grid-cols-2 h-full">
          <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
            <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#FFDD95] h-full w-full text-gray-900 rounded-lg hover:bg-[#ffd16d] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer">
              <FontAwesomeIcon
                icon={faMarker}
                size={"2x"}
                className="max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                72
              </div>
            </div>
            <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap">
              {t("bachelorpage.lecture")}
            </span>
          </div>
          <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
            <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#FFDD95] h-full w-full text-gray-900 rounded-lg hover:bg-[#ffd16d] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
              <FontAwesomeIcon
                icon={faFlask}
                size={"2x"}
                className="max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                36
              </div>
            </div>
            <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap">
              {t("bachelorpage.seminar")}
            </span>
          </div>
          <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
            <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#FFDD95] h-full w-full text-gray-900 rounded-lg hover:bg-[#ffd16d] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
              <FontAwesomeIcon
                icon={faLayerGroup}
                size={"2x"}
                className="max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                20
              </div>
            </div>
            <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap">
              {t("bachelorpage.lab")}
            </span>
          </div>
          <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
            <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#FFDD95] h-full w-full text-gray-900 rounded-lg hover:bg-[#ffd16d] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
              <FontAwesomeIcon
                icon={faPersonRunning}
                size={"2x"}
                className="max-2xl:scale-90 max-xl:scale-75"
              />
              <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                90
              </div>
            </div>
            <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap">
              {t("bachelorpage.individual")}
            </span>
          </div>
        </div>
        <div className="cursor-pointer rounded-lg w-1/3 h-full">
          <div className="h-[35vh]">
            <Doughnuts data={activitiesPercentage} />
          </div>
        </div>
        <div className="w-1/3">
          <div className="grid gap-2 lg:gap-4 grid-cols-1 lg:grid-cols-2 h-full">
            <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
              <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#86A7FC] h-full w-full text-gray-900 rounded-lg hover:bg-[#5c8aff] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
                <FontAwesomeIcon
                  icon={faTents}
                  size={"2x"}
                  className="max-2xl:scale-90 max-xl:scale-75"
                />
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                  22
                </div>
              </div>
              <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap text-base xl:text-lg">
                {t("bachelorpage.basepractice")}
              </span>
            </div>
            <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
              <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#86A7FC] h-full w-full text-gray-900 rounded-lg hover:bg-[#5c8aff] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size={"2x"}
                  className="max-2xl:scale-90 max-xl:scale-75"
                />
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                  10
                </div>
              </div>
              <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap text-base xl:text-lg">
                {t("bachelorpage.controlgroup")}
              </span>
            </div>
            <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
              <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#86A7FC] h-full w-full text-gray-900 rounded-lg hover:bg-[#5c8aff] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
                <FontAwesomeIcon
                  icon={faJetFighterUp}
                  size={"2x"}
                  className="max-2xl:scale-90 max-xl:scale-75"
                />
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                  22
                </div>
              </div>
              <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap text-base xl:text-lg">
                {t("bachelorpage.masterclass")}
              </span>
            </div>
            <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
              <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#86A7FC] h-full w-full text-gray-900 rounded-lg hover:bg-[#5c8aff] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  size={"2x"}
                  className="max-2xl:scale-90 max-xl:scale-75"
                />
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                  34
                </div>
              </div>
              <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap">
                {t("bachelorpage.practicalclasses")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
