import { createSlice } from "@reduxjs/toolkit";

export interface IDataDashboard {
  dashboard: {
    loggedIn: boolean;
    isCollapsed: boolean;
    activeMenuIndex: number;
    activeSubmenuIndex: number;
    openSubmenus: number[];
  };
}

export interface IRootState {
  loggedIn: boolean;
  isCollapsed: boolean;
  activeMenuIndex: number;
  activeSubmenuIndex: number;
  openSubmenus: number[];
}

const initialState: IRootState = {
  loggedIn: Boolean(sessionStorage.getItem("loggedIn")) || false,
  isCollapsed: false,
  activeMenuIndex: Number(sessionStorage.getItem("activeMenuIndex")) || 0,
  activeSubmenuIndex: Number(sessionStorage.getItem("activeSubmenuIndex")) || 0,
  openSubmenus: [],
};

const userSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setLogged: function (state, action) {
      if (!action.payload) {
        state.loggedIn = false;
      } else {
        state.loggedIn = true;
      }
      sessionStorage.setItem("loggedIn", JSON.stringify(state.loggedIn));
    },
    setActiveMenuIndex: function (state, action) {
      state.activeMenuIndex = action.payload;
      sessionStorage.setItem(
        "activeMenuIndex",
        JSON.stringify(state.activeMenuIndex)
      );
      return state;
    },
    setActiveSubmenuIndex: function (state, action) {
      state.activeSubmenuIndex = action.payload;
      sessionStorage.setItem(
        "activeSubmenuIndex",
        JSON.stringify(state.activeSubmenuIndex)
      );
      return state;
    },
    setIsCollapsed: function (state, action) {
      state.isCollapsed = action.payload;
      return state;
    },
    setOpenSubmenus: function (state, action) {
      if (state.openSubmenus.includes(action.payload)) {
        state.openSubmenus.filter((i) => i !== action.payload);
      } else {
        state.openSubmenus = [action.payload];
      }
      return state;
    },
    reset: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const {
  setLogged,
  setActiveMenuIndex,
  setIsCollapsed,
  setActiveSubmenuIndex,
  setOpenSubmenus,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
