import { useEffect, useState } from "react";
import { getSmartManagers } from "../../utils/Requests";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

export default function OrgChartManagement() {
  const [managementInfo, setManagementInfo] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation<string>();
  useEffect(() => {
    getSmartManagers()
      .then((response) => {
        setManagementInfo(response.data.rows);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <div className="overflow-y-auto h-full">
      {managementInfo && !isLoading ? (
        <table className="h-full w-full text-sm text-left text-black rtl:text-right dark:text-gray-200">
          <thead className="bg-[#14059c] dark:bg-toggleBackground text-md font-normal text-white dark:text-white">
            <tr>
              <th scope="col" className="w-12 py-3 text-center rounded-tl-lg">
                {t("structurepage.id") as string}
              </th>
              <th scope="col" className="w-80 py-3 text-center">
                {t("bachelorpage.fio") as string}
              </th>
              <th scope="col" className="py-3 text-center">
                {t("structurepage.rank") as string}
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                {t("structurepage.title") as string}
              </th>
            </tr>
          </thead>
          <tbody>
            {managementInfo.map((manager: any, index: number) => {
              return (
                <tr className="border-b" key={index}>
                  <td className="text-center py-1.5 font-normal">
                    {manager.id}
                  </td>
                  <td className="w-full h-full text-left font-medium flex items-center justify-start py-1.5">
                    <img
                      src={manager?.image_url}
                      className="h-20 w-16 mr-3 rounded-md"
                    />
                    {manager.fio}
                  </td>
                  <td className="text-center font-normal py-1.5">
                    {manager.position}
                  </td>
                  <td className="text-center font-normal py-1.5">
                    {manager.title_name}
                  </td>
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
