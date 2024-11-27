import { FC, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import "../styles/styles.scss";
import {
  AcademicCapIcon,
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  HomeIcon,
  LinkIcon,
  MapIcon,
  MoonIcon,
  PencilSquareIcon,
  PresentationChartBarIcon,
  ServerIcon,
  ShieldCheckIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  IDataDashboard,
  setActiveMenuIndex,
  setActiveSubmenuIndex,
  setIsCollapsed,
  setOpenSubmenus,
} from "../redux/dataStored/userReducer";
import { filterMenuItems } from "./FilterMenu";
import { IAuth, setDialog } from "../redux/dataStored/authReducer";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/auth/Dialog";

export interface IMenu {
  id: number;
  title: string;
  tooltip?: string;
  link: string;
  icon?: React.ReactElement;
  submenu?: boolean;
  submenuItems?: ISubmenu[];
  spacing?: boolean;
}

export interface ISubmenu {
  id: number;
  title: string;
  link: string;
}

/**
 * Sidebar - manages app's navigation
 * @returns TSX
 */
const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeMenuIndex = useSelector(
    (state: IDataDashboard) => state.dashboard.activeMenuIndex
  );
  const activeSubmenuIndex = useSelector(
    (state: IDataDashboard) => state.dashboard.activeSubmenuIndex
  );
  const openSubmenus = useSelector(
    (state: IDataDashboard) => state.dashboard.openSubmenus
  );
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );
  const isLoggedIn = useSelector((state: IAuth) => state.auth.isLoggedIn);
  const dialogStatus = useSelector(
    (state: IAuth) => state.auth.dialogStatus
  ) as boolean;

  // const userdata = useSelector((state: IAuth) => state.auth.userdata);
  const { theme, setTheme } = useContext(ThemeContext);
  const { t } = useTranslation<string>();
  // const [openSubmenus, setOpenSubmenus] = useState<number[]>([]);

  const Menus: IMenu[] = [
    {
      id: 1,
      title: t("home"),
      tooltip: t("home"),
      link: "/",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      id: 2,
      title: t("academy"),
      tooltip: t("academy"),
      link: "/academy",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      submenu: true,
      submenuItems: [
        { id: 1, title: t("structure"), link: "/academy" },
        { id: 2, title: t("areacontrol"), link: "/territory" },
        { id: 3, title: t("entrance"), link: "/entrance" },
        { id: 4, title: t("intercoop"), link: "/intercoop" },
      ],
    },
    {
      id: 3,
      title: t("education"),
      tooltip: t("education"),
      link: "/education",
      icon: <AcademicCapIcon className="h-6 w-6" />,
      submenu: true,
      submenuItems: [
        { id: 1, title: t("full-time"), link: "/education" },
        { id: 2, title: t("part-time"), link: "/parttime" },
        { id: 3, title: t("master"), link: "/master" },
        { id: 4, title: t("doctorate"), link: "/doctorate" },
        // { id: 5, title: t("training"), link: "/training" },
        { id: 5, title: t("academy timeline"), link: "/timeline" },
        { id: 6, title: t("professors activities"), link: "/activities" },
        { id: 7, title: t("schedule"), link: "/schedule" },
        // { id: 9, title: t("alumni"), link: "/alumni" },
        { id: 8, title: t("test center"), link: "/testcenter" },
      ],
    },
    {
      id: 4,
      title: t("scientific activity"),
      tooltip: t("scientific activity"),
      link: "/science",
      icon: <PencilSquareIcon className="h-6 w-6" />,
      submenu: true,
      submenuItems: [
        { id: 1, title: t("scientific potential"), link: "/science" },
        { id: 2, title: t("chairs potential"), link: "/chairspotential" },
        {
          id: 3,
          title: t("dynamics scientific potential"),
          link: "/sciencedynamics",
        },
        // {
        //   id: 4,
        //   title: t("scientists of academy"),
        //   link: "/scientists",
        // },
      ],
    },
    {
      id: 5,
      title: t("discipline"),
      tooltip: t("discipline"),
      link: "/doc",
      icon: <DocumentCheckIcon className="h-6 w-6" />,
      submenu: true,
      submenuItems: [{ id: 1, title: t("digital documents"), link: "/doc" }],
    },
    {
      id: 6,
      title: t("digital library"),
      tooltip: t("digital library"),
      link: "/elibrary",
      icon: <BookOpenIcon className="h-6 w-6" />,
    },
    {
      id: 7,
      title: t("analytics and prediction"),
      tooltip: t("analytics and prediction"),
      link: "/analytics",
      icon: <PresentationChartBarIcon className="h-6 w-6" />,
    },
    {
      id: 8,
      title: t("integrated systems"),
      tooltip: t("integrated systems"),
      link: "/integrations",
      icon: <LinkIcon className="h-6 w-6" />,
    },
    {
      id: 9,
      title: t("virtual academy"),
      tooltip: t("virtual academy"),
      link: "/map",
      icon: <MapIcon className="h-6 w-6" />,
      submenu: true,
      submenuItems: [
        { id: 1, title: t("map"), link: "/map" },
        { id: 2, title: t("virtual tour"), link: "/vtour" },
      ],
    },
    {
      id: 10,
      title: t("settings"),
      tooltip: t("settings"),
      link: "/settings",
      icon: <Cog6ToothIcon className="h-6 w-6" />,
      spacing: true,
    },
    {
      id: 11,
      title: t("loginpage.logout"),
      tooltip: t("loginpage.logout"),
      link: "/logout",
      icon: <ArrowLeftStartOnRectangleIcon className="h-6 w-6 rotate-180" />,
    },
  ];

  const filteredMenus = filterMenuItems(Menus, isLoggedIn);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("default-theme", isCurrentDark ? "light" : "dark");
    if (isCurrentDark) {
      document.getElementsByTagName("html")[0].classList.remove("dark");
    } else {
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  };

  const toggleSidebar = () => {
    dispatch(setIsCollapsed(!isCollapsed));
  };

  // const toggleSubmenu = (index: number) => {
  //   if (openSubmenus.includes(index)) {
  //     setOpenSubmenus(openSubmenus.filter((i) => i !== index));
  //   } else {
  //     setOpenSubmenus([index]);
  //   }
  // };

  const handleMenuClick = (index: number, link: string, subindex?: number) => {
    if (link === "/logout") {
      dispatch(setDialog(!dialogStatus));
      return;
    }
    navigate(link);
    if (subindex) {
      dispatch(setActiveSubmenuIndex(subindex));
    }
    dispatch(setActiveMenuIndex(index));
    dispatch(setOpenSubmenus(index !== openSubmenus[0] ? index : 0));
    // toggleSubmenu(index);
  };

  return (
    <aside
      className={`sidebar ${isCollapsed && "collapsed"} duration-300`}
      data-testid="sidebar"
    >
      <div className="sidebar-menu__toggle w-full">
        <div className="sidebar-menu__toggle-cont relative flex flex-row justify-between w-full">
          <ChevronLeftIcon
            onClick={toggleSidebar}
            className={`sidebar-menu__toggle-cont__button h-6 w-6 absolute top-6 -right-5  border border-gray-300 rounded-full p-1 cursor-pointer ${
              isCollapsed && "transform rotate-180 duration-1000"
            }`}
          />
        </div>
        <div
          className={`sidebar-menu__toggle-cont-logo h-10 flex items-center justify-center`}
        >
          {isCollapsed ? (
            <div>
              <img
                src={
                  theme === "dark"
                    ? "./assets/favicon.png"
                    : "./assets/favicon_gray.png"
                }
                alt=""
                className={`${!isCollapsed && "hidden"} h-10`}
              />
            </div>
          ) : (
            <div
              className={`flex flex-col items-center h-10 mt-10 ${
                isCollapsed && "hidden"
              }`}
            >
              {theme !== "dark" ? (
                <img src="./assets/building_blue.png" width={110} />
              ) : (
                <img src="./assets/building_white.png" width={110} />
              )}
              <div className="text-[14px] ">{t("smartacademy")}</div>
            </div>
          )}
        </div>
      </div>

      <ul
        className={`sidebar-menu mt-20 max-h-[calc(100vh-180px)] ${
          isCollapsed ? "" : "overflow-y-auto"
        } `}
      >
        {filteredMenus.map((menu: IMenu, index: number) => (
          <li
            key={index}
            className={`sidebar-menu__item text-sm items-center cursor-pointer px-2 py-1 ${
              menu.spacing && isCollapsed ? "border-b border-gray-300" : ""
            }`}
          >
            <div
              className={`sidebar-menu__item-container flex gap-x-1 items-center ${
                index === activeMenuIndex ? "active" : ""
              } `}
              onClick={() => handleMenuClick(index, menu.link, 1)}
            >
              <div className="sidebar-menu__item-container-icon float-left flex items-center p-2">
                {menu.icon ? menu.icon : <ServerIcon />}
                {menu.tooltip && isCollapsed ? (
                  <span className="sidebar-menu__item-container-icon-tooltip">
                    {menu.tooltip}
                  </span>
                ) : undefined}
              </div>
              <div
                className={`sidebar-menu__item-container-title text-md font-medium flex-1 duration-200 ${
                  isCollapsed && "hidden"
                }`}
              >
                {menu.title ? menu.title : ""}
              </div>
              {menu.submenu && !isCollapsed && (
                <div className="hover:bg-white hover:text-blue-800 rounded-full m-2">
                  <ChevronDownIcon
                    className={`h-4 w-4 m-1 ${
                      menu.submenu &&
                      activeMenuIndex === index &&
                      activeSubmenuIndex &&
                      openSubmenus.includes(index)
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              )}
            </div>
            {menu.submenu && !isCollapsed && (
              <ul
                className={`${
                  openSubmenus.includes(index) ? "block" : "hidden"
                } flex flex-col sidebar-menu__item-submenu`}
              >
                {menu.submenuItems?.map((submenuItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`sidebar-menu__item-submenu-title ml-8 mt-1.5 ${
                      index === activeMenuIndex &&
                      subIndex + 1 === activeSubmenuIndex
                        ? "activeSubmenu"
                        : ""
                    }`}
                    onClick={() => {
                      if (index === activeMenuIndex) {
                        if (submenuItem.link === "/vtour") {
                          window.open("https://vtour.akd", "_blank");
                        } else {
                          navigate(submenuItem.link);
                          dispatch(setActiveSubmenuIndex(submenuItem.id));
                        }
                      }
                    }}
                  >
                    {submenuItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="toggle-btn-section flex justify-center items-center">
        {!isCollapsed ? <MoonIcon className="h-5 w-5" /> : undefined}
        <div className={`toggle-checkbox m-vertical-auto px-3`}>
          <input
            className="toggle-btn__input"
            type="checkbox"
            name="checkbox"
            onChange={handleThemeChange}
            checked={theme === "light"}
          />
          <button
            type="button"
            className={`toggle-btn__input-label`}
            onClick={handleThemeChange}
          ></button>
        </div>
        {!isCollapsed ? (
          <SunIcon className="h-6 w-6 duration-200" />
        ) : undefined}
      </div>
      <ConfirmDialog />
    </aside>
  );
};

export default Sidebar;
