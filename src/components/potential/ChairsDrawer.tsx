import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChairsInfo from "./ChairsInfo";
import { useTranslation } from "react-i18next";

type Props = {
  showDrawer: boolean;
  setShowDrawer: (showDrawer: boolean) => void;
  selectedChairId: string;
};

export default function ChairsDrawer({
  showDrawer,
  setShowDrawer,
  selectedChairId,
}: Props) {
  const { t } = useTranslation<string>();

  return (
    <div
      id="drawer-example"
      className={`h-full fixed top-12 right-0 z-40 ransform ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out overflow-y-auto bg-white dark:bg-headerFooterBackground  w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[35vw] 3xl:w-[36vw] border-l border-t border-gray-300 dark:border-gray-500`}
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <div className="sticky top-0 right-0 left-0 bg-white dark:bg-headerFooterBackground p-4">
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-1 text-base font-semibold text-black dark:text-white uppercase"
        >
          {t("professorspage.about_chair")}
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
      <div className="px-4 h-[calc(100%-80px)]">
        <ChairsInfo selectedChairId={selectedChairId} />
      </div>
    </div>
  );
}
