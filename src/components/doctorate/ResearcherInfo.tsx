import { faClose, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { getResearcherDetails, getWorkPlan } from "../../utils/Requests";
import { useEffect, useState } from "react";
import ProgressBar from "../../utils/ProgressBar";

type Props = {
  showDrawer: boolean;
  setShowDrawer: (showDrawer: boolean) => void;
  activeResearcher: number | null;
};

export default function ResearcherInfo({
  showDrawer,
  setShowDrawer,
  activeResearcher,
}: Props) {
  const { i18n, t } = useTranslation<string>();
  const [researcherData, setResearcherData] = useState<any>([]);
  const [workPlan, setWorkPlan] = useState<any>("");

  const handleDownload = () => {
    if (workPlan) {
      const url = `http://tadqiqotchi.akadmvd.uz/storage/${workPlan}`;
      const newTab = window.open(url, "_blank", "noopener,noreferrer");
      if (newTab) {
        const link = document.createElement("a");
        link.href = url;
        link.download = workPlan;
        link.click();
        newTab.close();
      }
    }
  };

  useEffect(() => {
    if (activeResearcher) {
      getResearcherDetails(activeResearcher)
        .then((response) => {
          setResearcherData(response.data?.rows[0]);
        })
        .catch((err) => {
          console.log(err);
        });

      getWorkPlan(activeResearcher)
        .then((response) => {
          setWorkPlan(response.data?.pdf_filename_full_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [i18n.language, activeResearcher]);

  return (
    <div
      id="drawer-example"
      className={`fixed top-12 right-0 z-40 h-screen overflow-y-auto transform ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-50 w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[35vw] dark:bg-headerFooterBackground border-l border-t border-gray-300 dark:border-gray-500`}
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <div className="sticky top-0 right-0 left-0 bg-gray-50 dark:bg-headerFooterBackground p-4">
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-2 text-base font-semibold text-black dark:text-white uppercase"
        >
          {t("doctoratepage.researcher")}
        </h5>

        <hr className="h-px bg-gray-300 border-0 dark:bg-gray-400"></hr>
        <button
          type="button"
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            setShowDrawer(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} size={"lg"} />
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      {activeResearcher && (
        <div className="px-4 pb-4 mb-10">
          <div className="grid grid-cols-2 grid-rows-4 gap-4">
            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-4">
              <div className="text-center font-semibold">
                {t("doctoratepage.speciality")}
              </div>
              <hr className="border-gray-300 dark:border-slate-200 mb-6 mt-1" />
              <div className="text-center">
                {researcherData.name ? researcherData.name : ""}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-transparent rounded-lg shadow-lg dark:shadow-none p-4 row-span-2">
              <div className="w-[145px] 2xl:w-[175px] h-[175px] 2xl:h-[225px] flex items-center justify-center">
                {researcherData.image ? (
                  <img
                    width="170"
                    height="200"
                    src={`http://tadqiqotchi.akadmvd.uz/storage/${researcherData.image}`}
                  />
                ) : undefined}
              </div>

              <div className="p-2 text-center w-60 mt-2">
                {researcherData.researcher_name}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-4">
              <div className="text-center font-semibold">
                {t("doctoratepage.supervisor")}
              </div>
              <hr className="border-gray-300 dark:border-slate-200 mb-6 mt-1" />
              <div className="text-center">
                {researcherData.supervisor_name
                  ? researcherData.supervisor_name
                  : ""}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-4 col-span-2">
              <div className="text-center font-semibold">
                {t("doctoratepage.topic")}
              </div>
              <hr className="border-gray-300 dark:border-slate-200 mb-6 mt-1" />
              <div className="text-center">
                {researcherData.mavzu ? researcherData.mavzu : ""}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-4 col-span-2">
              <div className="text-center font-semibold">
                {t("doctoratepage.completion")}
              </div>
              <hr className="border-gray-300 dark:border-slate-200 mb-6 mt-1" />
              <ProgressBar
                percentage={
                  researcherData.ball
                    ? Number(researcherData.ball).toFixed(0)
                    : 0
                }
              />
            </div>
          </div>
          <div className="py-4 grid grid-cols-3 grid-rows-2 gap-4">
            <div className="bg-white dark:bg-slate-500 rounded-lg col-span-2 p-6 flex justify-between items-center shadow-lg text-xl">
              <div>{t("doctoratepage.personal plan")}</div>
              <FontAwesomeIcon
                icon={workPlan ? faDownload : faClose}
                className="dark:text-white text-3xl hover:text-blue-600 dark:hover:text-orange-500 hover:cursor-pointer"
                onClick={handleDownload}
              />
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 flex justify-between items-center shadow-lg text-xl">
              <div>{t("doctoratepage.article")}</div>
              <div>{researcherData.maqola ? researcherData.maqola : 0}</div>
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-slate-700 rounded-lg  shadow-lg p-6 text-xl">
              <div>{t("doctoratepage.certificate")}</div>
              <div>
                {researcherData.guvohnoma ? researcherData.guvohnoma : 0}
              </div>
            </div>
            <div className="flex justify-between items-center bg-white dark:bg-slate-700 rounded-lg  p-6 shadow-lg text-xl">
              <div>{t("doctoratepage.thesis")}</div>
              <div>{researcherData.tezis ? researcherData.tezis : 0}</div>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg px-6 py-2 flex justify-between items-center shadow-lg text-xl">
              <div className="w-48">{t("doctoratepage.dissertation")}</div>
              <div>{researcherData.reja ? researcherData.reja : 0}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
