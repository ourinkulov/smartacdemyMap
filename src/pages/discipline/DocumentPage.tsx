import { useEffect, useState } from "react";
import {
  faClock,
  faFileAlt,
  faFileArrowDown,
  faFileArrowUp,
  faFileCircleCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import IncomingDocs from "../../components/docs/IncomingDocs";
import ResultsByOrgs from "../../components/docs/ResultsByOrgs";
import TopPerformers from "../../components/docs/TopPerformers";
import ControlledDocs from "../../components/docs/ControlledDocs";
import { getDocData } from "../../utils/Requests";
import Loader from "../../utils/Loader";

type response = {
  all_cnt: number;
  income_cnt: number;
  outcome_cnt: number;
  executed_cnt: number;
  process_cnt: number;
  expired_cnt: number;
};

export default function DocumentPage() {
  const { t, i18n } = useTranslation<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [docData, setDocData] = useState<response>();

  useEffect(() => {
    getDocData()
      .then((response) => {
        setIsLoading(true);
        setDocData(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <div
      className="h-full overflow-y-scroll"
      // ref={bachRef as React.RefObject<HTMLDivElement>}
      // onWheel={handleWheel}
      // onKeyDown={handleWheelKeyDown}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <section className="">
          <div className="px-4 py-3 mx-auto text-center lg:py-2">
            <dl className="grid gap-4 xl:gap-x-8 mx-auto text-gray-900 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 2xl:gap-x-4 dark:text-white">
              <div className="flex items-center justify-around px-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#0e3dbe] dark:text-white shadow-md rounded-lg py-2 md:py-6 transition duration-500 ease-in border-b-8 border-[#0e3dbe] dark:border-white hover:-translate-y-1  hover:scale-105">
                <div className="flex flex-col gap-1">
                  <dt>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      size={"2x"}
                      className="max-2xl:scale-90 max-xl:scale-75"
                    />
                  </dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    {docData?.all_cnt}
                  </dd>
                </div>
                <div className="w-32 max-2xl:text-xl 2xl:text-md 3xl:text-xl">
                  {t("documentspage.general documents")}
                </div>
              </div>
              <div className="flex items-center justify-around px-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#0e3dbe] dark:text-white shadow-md rounded-lg py-2 md:py-6 transition duration-500 ease-in border-b-8 border-[#0e3dbe] dark:border-white hover:-translate-y-1  hover:scale-105">
                <div className="flex flex-col gap-1">
                  <dt>
                    <FontAwesomeIcon
                      icon={faFileArrowDown}
                      size={"2x"}
                      className="max-2xl:scale-90 max-xl:scale-75"
                    />
                  </dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    {docData?.income_cnt}
                  </dd>
                </div>
                <div className="w-32 max-2xl:text-xl 2xl:text-md 3xl:text-xl">
                  {t("documentspage.incoming documents")}
                </div>
              </div>
              <div className="flex items-center justify-around px-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#0e3dbe] dark:text-white shadow-md rounded-lg py-2 md:py-6 transition duration-500 ease-in border-b-8 border-[#0e3dbe] dark:border-white hover:-translate-y-1  hover:scale-105">
                <div className="flex flex-col gap-1">
                  <dt>
                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      size={"2x"}
                      className="max-2xl:scale-90 max-xl:scale-75"
                    />
                  </dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    {docData?.outcome_cnt}
                  </dd>
                </div>
                <div className="w-32 max-2xl:text-xl 2xl:text-md 3xl:text-xl">
                  {t("documentspage.outgoing documents")}
                </div>
              </div>
              <div className="flex items-center justify-around px-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#008000] dark:text-white shadow-md rounded-lg py-2 md:py-6 transition duration-500 ease-in border-b-8 border-[#008000] dark:border-white hover:-translate-y-1  hover:scale-105">
                <div className="flex flex-col gap-1">
                  <dt>
                    <FontAwesomeIcon
                      icon={faFileCircleCheck}
                      size={"2x"}
                      className="max-2xl:scale-90 max-xl:scale-75"
                    />
                  </dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    {docData?.executed_cnt}
                  </dd>
                </div>
                <div className="w-36 max-2xl:text-xl 2xl:text-md 3xl:text-xl">
                  {t("documentspage.completed documents")}
                </div>
              </div>
              <div className="flex items-center justify-around px-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#ff8c00] dark:text-white shadow-md rounded-lg py-2 md:py-6 transition duration-500 ease-in border-b-8 border-[#ff8c00] dark:border-white hover:-translate-y-1  hover:scale-105">
                <div className="flex flex-col gap-1">
                  <dt>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size={"2x"}
                      className="max-2xl:scale-90 max-xl:scale-75"
                      spinPulse
                    />
                  </dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    {docData?.process_cnt}
                  </dd>
                </div>
                <div className="w-32 max-2xl:text-xl 2xl:text-md 3xl:text-xl">
                  {t("documentspage.in process")}
                </div>
              </div>
              <div className="flex items-center justify-around px-2 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#8b0000] dark:text-white shadow-md rounded-lg py-2 md:py-6 transition duration-500 ease-in border-b-8 border-[#8b0000] dark:border-white hover:-translate-y-1  hover:scale-105">
                <div className="flex flex-col gap-1">
                  <dt>
                    <FontAwesomeIcon
                      icon={faClock}
                      size={"2x"}
                      className="max-2xl:scale-90 max-xl:scale-75"
                      shake
                    />
                  </dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    {docData?.expired_cnt}
                  </dd>
                </div>
                <div className="w-32 max-2xl:text-xl 2xl:text-md 3xl:text-xl">
                  {t("documentspage.deadline passed")}
                </div>
              </div>
            </dl>
          </div>
        </section>
      )}
      <section className="px-2 md:px-4 py-3">
        <IncomingDocs />
      </section>
      <section className="px-2 md:px-4 py-3">
        <ControlledDocs />
      </section>
      <section className="px-2 md:px-4 py-1">
        <TopPerformers />
      </section>
      <section className="px-2 md:px-4 py-3">
        <ResultsByOrgs />
      </section>
    </div>
  );
}
