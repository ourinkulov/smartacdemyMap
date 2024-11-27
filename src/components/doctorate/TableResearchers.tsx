import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeContext";
import { getResearchers, getResearchPeriods } from "../../utils/Requests";
import ResearcherInfo from "./ResearcherInfo";

export default function TableResearchers() {
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation<string>();
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [researchers, setResearchers] = useState([]);
  const [activeResearcher, setActiveResearcher] = useState(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(Number(event.target.value));
  };

  const handleResearcher = (researcher: any) => {
    setActiveResearcher(researcher);
    setShowDrawer(true);
  };

  useEffect(() => {
    getResearchPeriods()
      .then((response) => {
        setPeriods(response.data.rows);
        setSelectedPeriod(response.data.rows[6]?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [i18n.language]);

  useEffect(() => {
    if (selectedPeriod) {
      getResearchers(selectedPeriod)
        .then((response) => {
          setResearchers(response.data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [i18n.language, selectedPeriod]);

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 text-base md:text-lg font-bold leading-tight mb-4 text-gray-900 dark:text-gray-100">
        <div>{t("doctoratepage.researchers")}</div>
        <label
          htmlFor="select"
          className="block text-sm font-medium text-gray-700 dark:text-white px-2"
        >
          <select
            id="select"
            name="select"
            value={selectedPeriod ? selectedPeriod : 1}
            onChange={handlePeriodChange}
            className="mt-1 mx-2 px-2 py-1 dark:bg-slate-700 text-xs sm:text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-md"
          >
            {periods.map((item: any, index: number) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <hr className="border-gray-300 dark:border-gray-600 mb-6" />

      <div className="flex h-full gap-4 max-xl:flex-wrap ">
        <div className="w-full xl:w-3/5 h-full bg-slate-300 dark:bg-slate-500 rounded-lg shadow-md p-2">
          <table className="h-full w-full text-sm text-left rtl:text-right text-black dark:text-gray-300">
            <thead className="text-xs text-black uppercase dark:text-gray-100">
              <tr className="text-center">
                <th
                  scope="col"
                  className="flex justify-center items-center w-10 py-3 h-full"
                >
                  {t("structurepage.id") as string}
                </th>
                <th scope="col" className="">
                  {t("bachelorpage.fio") as string}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("professorspage.academic_degree") as string}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("professorspage.points") as string}
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto h-full">
              {researchers?.map((researcher: any, index: number) => {
                return (
                  <tr
                    className={`${
                      activeResearcher == researcher?.researcher_id
                        ? "bg-[#cccccc] text-black"
                        : researcher.total_grade > 0
                        ? "bg-green-500"
                        : "bg-orange-300"
                    } border-b text-black dark:border-gray-700 hover:bg-[#14059c] hover:text-white dark:hover:bg-toggleBackground text-center cursor-pointer`}
                    key={index}
                    onClick={() => {
                      handleResearcher(researcher?.researcher_id);
                    }}
                    id={researcher?.researcher_id}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="font-medium text-left py-1.5">
                        <div className="line-clamp-1">
                          {researcher.researcher_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1.5">
                      <div className="font-medium">
                        <div className="line-clamp-1">
                          {researcher.researcher_type == 1
                            ? t("professorspage.phd")
                            : t("professorspage.phd")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1.5">
                      <div className="font-medium">
                        {researcher.total_grade}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full xl:w-2/5 h-full bg-slate-300 dark:bg-slate-500 rounded-lg shadow-md">
          <ResearcherInfo
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            activeResearcher={activeResearcher}
          />
        </div>
      </div>
    </div>
  );
}
