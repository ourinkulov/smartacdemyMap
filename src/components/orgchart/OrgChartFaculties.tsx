import { useEffect, useState } from "react";
import { getFaculties } from "../../utils/Requests";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

export default function OrgChartFaculties() {
  const [facultyInfo, setFacultyInfo] = useState<any>([]);
  const { i18n, t } = useTranslation<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFaculties()
      .then((response) => {
        setFacultyInfo(response.data.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <>
      <div className="overflow-y-auto h-full">
        {!isLoading ? (
          <table className="w-full text-sm text-left text-black rtl:text-right  dark:text-gray-200 ">
            <thead className="bg-[#14059c] dark:bg-toggleBackground text-md font-normal text-white dark:text-white">
              <tr>
                <th
                  scope="col"
                  className="w-12 py-3 px-2 text-center rounded-tl-lg"
                >
                  {t("structurepage.id") as string}
                </th>
                <th scope="col" className="px-2 py-3 text-center">
                  {t("structurepage.faculty_name") as string}
                </th>
                <th scope="col" className="px-2 py-3 text-center rounded-tr-lg">
                  {t("structurepage.code") as string}
                </th>
              </tr>
            </thead>
            <tbody>
              {facultyInfo.map((faculty: any, index: number) => {
                return (
                  <tr className="border-b" key={index}>
                    <th className="text-center py-1.5 font-normal">
                      {index + 1}
                    </th>
                    <th className="text-left font-normal">{faculty.name}</th>
                    <th className="text-left font-normal">{faculty.code}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
