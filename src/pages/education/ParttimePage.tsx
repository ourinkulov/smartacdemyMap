import { useTranslation } from "react-i18next";
import ChartSection from "../../components/dashboard/ChartSection";
import useIncrementEffect from "../../hooks/useIncementEffect";
import {
  faBookOpen,
  faUsers,
  faGraduationCap,
  faClipboardList,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

import TableGroup from "../../components/dashboard/TableGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ParttimePage() {
  const { t } = useTranslation<string>();

  return (
    <div className="h-full overflow-y-scroll">
      <section className="dark:bg-bodyBackgroundColor">
        <div className="px-4 mx-auto text-center lg:py-2">
          <dl className="grid gap-x-8 gap-y-4 xl:gap-x-8 mx-auto text-gray-900 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 dark:text-white">
            <div className="flex items-center justify-around 2xl:justify-between p-2 py-6 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <div className="w-full flex items-center justify-around">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white"
                />
                <div>
                  <dt className="text-3xl md:text-4xl font-extrabold">
                    {useIncrementEffect(0, 1, 150, 1)}
                  </dt>
                  <dd className="font-medium text-xl">
                    {t("parttimepage.courses")}
                  </dd>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 py-6 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <div className="w-full flex items-center justify-around">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white"
                />
                <div>
                  <dt className="text-3xl md:text-4xl font-extrabold">
                    {useIncrementEffect(0, 1, 15, 1618)}
                  </dt>
                  <dd className="font-medium text-xl">
                    {t("parttimepage.students")}
                  </dd>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 py-6 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <div className="w-full flex items-center justify-around">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white"
                />
                <div>
                  <dt className="text-3xl md:text-4xl font-extrabold">
                    {useIncrementEffect(0, 1, 15, 75)}
                  </dt>
                  <dd className="font-medium text-xl">
                    {t("parttimepage.teachers")}
                  </dd>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 py-6 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <div className="w-full flex items-center justify-around">
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white"
                />
                <div>
                  <dt className="text-3xl md:text-4xl font-extrabold">
                    {useIncrementEffect(0, 1, 50, 23)}
                  </dt>
                  <dd className="font-medium text-xl">
                    {t("masterpage.disciplines")}
                  </dd>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-around p-2 py-6 bg-white dark:bg-slate-700 dark:hover:bg-toggleBackground cursor-pointer text-[#14059c] dark:text-white shadow-lg rounded-lg transition duration-500 ease-in border-b-8 border-[#14059c] dark:border-white hover:-translate-y-1 hover:scale-110">
              <div className="w-full flex items-center justify-around">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="w-10 h-10 md:w-12 md:h-12 text-[#14059c] dark:text-white"
                />
                <div>
                  <dt className="text-3xl md:text-4xl font-extrabold">
                    {useIncrementEffect(0, 1, 5, 1324)}
                  </dt>
                  <dd className="font-medium text-lg">
                    {t("masterpage.graduates")}
                  </dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </section>
      <section className="px-4 py-3" id="chart">
        <ChartSection educationTypeId={11} educationFormId={13} />
      </section>

      <section className="px-4 py-3">
        <TableGroup educationTypeId={11} educationFormId={13} />
      </section>
    </div>
  );
}

export default ParttimePage;
