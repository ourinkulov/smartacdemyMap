import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { availableLanguages } from "../i18n";
import { Menu, Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/dataStored/authReducer";

/**
 * For filtering classes
 * @param {string[]} classes
 * @returns classes
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Language selector used i18n
 * @returns JSX element
 */
export default function LanguageSelector() {
  const { i18n } = useTranslation<string>();
  const dispatch = useDispatch();

  /**
   * Change language function
   * @param e target language short version
   */
  const changeLang = (e: any) => {
    const language = e.target.innerText !== "Ўз" ? e.target.innerText : "Cr";
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
    localStorage.setItem("i18nextLng", language);
  };

  return (
    <Menu as="div" className="relative">
      <div className="flex items-center">
        <Menu.Button className="">
          <GlobeAltIcon className="h-5 w-5 cursor-pointer m-1.5 sm:m-2" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-12 origin-top-right rounded-md bg-white dark:bg-toggleBackground  hover:text-[#14059c] dark:hover:bg-toggleBackground dark:hover:text-darkColor py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          {availableLanguages.map((language, index) => {
            if (i18n.language !== language) {
              return (
                <Menu.Item
                  disabled={i18n.language === language ? true : false}
                  key={index}
                >
                  {({ active }) => (
                    <span
                      onClick={changeLang}
                      className={classNames(
                        active
                          ? "text-white dark:bg-white dark:text-black hover:bg-[#14059c]"
                          : "dark:text-white",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {language === "Cr" ? "Ўз" : language}
                    </span>
                  )}
                </Menu.Item>
              );
            }
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
