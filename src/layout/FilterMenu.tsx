import { IMenu } from "./Sidebar";

// filters Menu depending user's status (loggedIn or Out)
export const filterMenuItems = (
  menus: IMenu[],
  isLoggedIn: boolean
): IMenu[] => {
  return menus.filter((item) => {
    if (item.submenu) {
      item.submenuItems = filterMenuItems(item.submenuItems || [], isLoggedIn);
      return item.submenuItems.length > 0;
    } else {
      if (item.link === "/#/") {
        return true;
      } else if (item.link !== "/#/login") {
        return isLoggedIn;
      } else {
        return !isLoggedIn;
      }
    }
  });
};
