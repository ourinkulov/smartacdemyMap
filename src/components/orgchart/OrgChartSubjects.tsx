import { useEffect, useState } from "react";
import { getSubjects } from "../../utils/Requests";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

export default function OrgChartFaculties() {
  const [subjectInfo, setSubjectInfo] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    getSubjects()
      .then((response) => {
        setSubjectInfo(response.data.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <div className="overflow-y-auto h-full">
      {!isLoading ? (
        <table className="h-full w-full text-sm text-left text-black rtl:text-right  dark:text-gray-200">
          <thead className="sticky top-0 bg-[#14059c] dark:bg-toggleBackground text-md font-normal text-white dark:text-white">
            <tr>
              <th scope="col" className="w-10 py-3 text-center rounded-tl-lg">
                {t("structurepage.id") as string}
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                {t("structurepage.subject_name") as string}
              </th>
              <th scope="col" className="px-2 py-3 text-center rounded-tr-lg">
                {t("structurepage.edu_type") as string}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {subjectInfo.map((subject: any, index: number) => {
              return (
                <tr className="border-b">
                  <th className="text-center p-2 font-normal">{index + 1}</th>
                  <th className="text-left font-normal w-[70%]">
                    {subject.subject_name}
                  </th>
                  <th className="text-center font-normal">
                    {subject.education_type}
                  </th>
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
  );
}
