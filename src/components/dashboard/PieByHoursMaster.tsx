import {
  faLayerGroup,
  faFlask,
  faMagnifyingGlass,
  faMarker,
  faPersonRunning,
  faTents,
  faBookOpenReader,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import Doughnuts from "../../components/dashboard/PieChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useState } from "react";
// import { getActivities } from "../../utils/Requests";

type PieByHoursProps = {
  educationTypeId: number;
};

export default function PieByHours(props: PieByHoursProps) {
  const { educationTypeId } = props;
  const { i18n, t } = useTranslation<string>();
  const [activitiesPercentage, setActiviesPercentage] = useState<number[]>([
    88.89, 11.11,
  ]);

  // useEffect(() => {
  //   getActivities(educationTypeId).then((response) => {
  //     setActiviesPercentage([
  //       response.data.practical,
  //       response.data.theoretical,
  //     ]);
  //   });
  // }, [i18n.language]);

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
      <div className="text-base md:text-lg font-semibold leading-5">
        {t("bachelorpage.distribution_study_plan") as string}
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
                330
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
                582
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
                240
              </div>
            </div>
            <span className="flex-1 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap">
              {t("bachelorpage.practical")}
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
                576
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
        <div className="w-1/3 flex items-center justify-center">
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
              <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#86A7FC] w-1/2 text-gray-900 rounded-lg hover:bg-[#5c8aff] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
                <FontAwesomeIcon
                  icon={faTents}
                  size={"2x"}
                  className="max-2xl:scale-90 max-xl:scale-75"
                />
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                  108
                </div>
              </div>
              <div className="max-w-24 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap text-base xl:text-lg">
                {t("bachelorpage.scientific_practice")}
              </div>
            </div>
            <div className="flex flex-col items-center px-2 lg:px-5 xl:px-8 py-1 lg:py-3 text-base xl:text-lg group">
              <div className="flex justify-between items-center p-2 lg:p-3 xl:p-6 bg-[#86A7FC] w-1/2 text-gray-900 rounded-lg hover:bg-[#5c8aff] transition duration-500 ease-in-out hover:-translate-y-1  hover:scale-110 cursor-pointer">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size={"2x"}
                  className="max-2xl:scale-90 max-xl:scale-75"
                />
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold">
                  108
                </div>
              </div>
              <div className="max-w-24 ms-0 lg:ms-3 whitespace-normal 2xl:whitespace-nowrap text-base xl:text-lg">
                {t("bachelorpage.masterthesis")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-center text-black">
        <div className="w-1/2 flex flex-col">
          <div className="bg-[#FFDD95] rounded-lg flex gap-8 justify-end items-center px-6 py-6">
            <div className="font-bold text-[28px] ">1728</div>
            <div className="text-[22px]">
              {t("bachelorpage.trainingclasses")}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col ">
          <div className="bg-[#86A7FC] rounded-lg flex gap-8 justify-start items-center px-6 py-6">
            <div className="text-[22px]">
              {t("professorspage.scientific_works2")}
            </div>
            <div className="font-bold text-[28px]">216</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-center items-center justify-center ">
        <div className="w-1/3 flex gap-4 items-center justify-end py-4">
          <div className="text-[22px]">
            {t("bachelorpage.documents_comment")}
          </div>
          <div className="bg-[#FFDD95] rounded-lg flex gap-8 justify-end items-center px-6 py-4 text-black">
            <FontAwesomeIcon
              icon={faFileLines}
              size={"2x"}
              className="max-2xl:scale-90 max-xl:scale-75"
            />
            <div className="font-bold text-[28px]">75</div>
          </div>
        </div>
        <div className="w-1/3 flex gap-4 items-center justify-start py-4">
          <div className="bg-[#86A7FC] rounded-lg flex gap-8 justify-start items-center px-6 py-4 text-black">
            <div className="font-bold text-[28px]">150</div>
            <FontAwesomeIcon
              icon={faBookOpenReader}
              size={"2x"}
              className="max-2xl:scale-90 max-xl:scale-75"
            />
          </div>
          <div className="text-[22px]">
            {t("professorspage.scientific_works")}
          </div>
        </div>
      </div>
    </div>
  );
}
