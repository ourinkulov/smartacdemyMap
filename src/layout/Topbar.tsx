import LanguageSelector from "../components/LanguageSelector";
import ThemeSelector from "../components/ThemeSelector";
import UserSelector from "../components/UserSelector";
import NotifySelector from "../components/Notification";

export default function Topbar() {
  return (
    <div className="topbar flex justify-between max-sm:p-2 sm:px-8 sm:py-4 h-12 dark:bg-[#141b2d]">
      <div className="topbar-search"></div>
      <div className="topbar-button flex justify-center items-center">
        <div
          className={`toggle-btn__input-label hover:bg-[#ccc] dark:hover:bg-toggleBackground hover:rounded-full dark:hover:text-darkColor`}
        >
          <ThemeSelector />
        </div>
        <div
          className={`toggle-btn__input-label hover:bg-[#ccc] dark:hover:bg-toggleBackground hover:rounded-full dark:hover:text-darkColor`}
        >
          <LanguageSelector />
        </div>
        <div
          className={`toggle-btn__input-label hover:bg-[#ccc] dark:hover:bg-toggleBackground hover:rounded-full dark:hover:text-darkColor`}
        >
          <UserSelector />
        </div>
        <div
          data-tooltip-target="tooltip-default"
          className={`toggle-btn__input-label hover:bg-[#ccc] dark:hover:bg-toggleBackground hover:rounded-full dark:hover:text-darkColor`}
        >
          <NotifySelector />
        </div>
      </div>
    </div>
  );
}
