import { useTranslation } from "react-i18next";

export default function NotfoundPage() {
  const { t } = useTranslation<string>();
  return (
    <div className="h-[calc(100vh-65px)] flex max-xl:flex-col items-start max-xl:overflow-y-auto bg-white dark:bg-[#1f2a40] p-2 mx-4 rounded-lg shadow-lg">
      <div className="w-full h-full flex flex-col items-center justify-center ">
        {/* <span className="text-7xl mb-8">404</span> */}
        <span className="text-3xl">{t("soon")}</span>
      </div>
    </div>
  );
}
