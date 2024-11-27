import { useTranslation } from "react-i18next";
import DynamicsCharts from "./DynamicsCharts";

export default function ScienceDynamics() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full px-4">
      <div className="w-full flex items-center justify-between border-b border-[#14059c] dark:border-white">
        <div className="font-semibold uppercase line-clamp-1">
          {t("dynamics scientific potential")}
        </div>
        <div className="h-9"></div>
      </div>
      <div className="h-[calc(100%-20px)] w-full flex flex-col gap-2 overflow-y-auto">
        <DynamicsCharts />
      </div>
    </div>
  );
}
