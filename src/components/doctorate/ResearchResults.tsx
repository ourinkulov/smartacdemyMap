import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getResearchPeriods, getResearchResults } from "../../utils/Requests";

export default function ResearchResults() {
  const { t, i18n } = useTranslation<string>();
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(6);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(Number(event.target.value));
  };

  const [researchResults, setResearchResults] = useState<any>([]);

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
    getResearchResults(selectedPeriod)
      .then((response) => {
        // if (response.data) {
        setResearchResults([
          {
            title: t("doctoratepage.article"),
            number: response.data.maqola ? response.data.maqola : 0,
          },
          {
            title: t("doctoratepage.certificate"),
            number: response.data.guvoxnoma ? response.data.guvoxnoma : 0,
          },
          {
            title: t("doctoratepage.autothesis"),
            number: response.data.avtoreferat ? response.data.avtoreferat : 0,
          },
          {
            title: t("doctoratepage.thesis"),
            number: response.data.tezis ? response.data.tezis : 0,
          },
          {
            title: t("doctoratepage.act"),
            number: response.data.dalolatnoma ? response.data.dalomatnoma : 0,
          },
          {
            title: t("doctoratepage.dissertation"),
            number: response.data.reja ? response.data.reja : 0,
          },
        ]);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [i18n.language, selectedPeriod]);

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-x-4 mb-4">
        <div className="text-base md:text-lg font-bold leading-tight   text-gray-900 dark:text-gray-100">
          {t("doctoratepage.research results")}
        </div>
        <label
          htmlFor="select"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          <select
            id="select"
            name="select"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="mt-1 mx-2 px-2 py-1 dark:bg-slate-700 text-xs sm:text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-md truncate"
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
      <div className="p-6 mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchResults?.map((item: any, index: number) => (
          <div key={index} className="relative max-w-[350px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-2xl transform skew-y-6"></div>
            <div className="relative bg-indigo-700 dark:bg-orange-400 dark:text-black p-6 rounded-2xl transform hover:rotate-2 hover:scale-105 transition-all duration-300">
              <div className="mb-2 font-semibold text-lg text-white">
                {item.title}
              </div>
              <div className="text-center font-bold text-4xl text-white pb-4">
                {item.number}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
