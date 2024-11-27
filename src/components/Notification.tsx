import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

/**
 * User selector
 * @returns JSX element
 */
export default function NotifySelector() {
  const { t } = useTranslation<string>();
  /**
   * Change language function
   * @param e target language short version
   */

  return (
    <Menu as="div" className="relative">
      <div className="flex items-center">
        <Menu.Button className="">
          <BellIcon className="h-5 w-5 cursor-pointer m-1.5 sm:m-2" />
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
        <Menu.Items className="absolute right-0 z-50 mt-2 origin-top-right rounded-md bg-white dark:bg-toggleBackground   dark:hover:text-darkColor py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          <Menu.Item>
            <span className={"dark:text-white block px-4 py-2 text-sm"}>
              {t("notification")}
            </span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
