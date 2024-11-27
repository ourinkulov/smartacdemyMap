import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type IUserdata = {
  email: string;
  fio: string;
  id: number;
  is_staff: number;
  language: string;
  login: string;
  phone: string;
  target_id: number | null;
  token: string;
  user_roles_id: number;
}

export type IAuth = {
  auth: {
    language: string;
    userdata: IUserdata;
    token: string | null;
    user: string | null;
    isLoggedIn: boolean;
    dialogStatus: boolean;
  };
}

export type IAuthState = {
  language: string;
  userdata: IUserdata;
  token: string | null;
  user: string | null;
  isLoggedIn: boolean;
  dialogStatus: boolean;
}

const initialState: IAuthState = {
  language: localStorage.getItem("i18nextLng")! || "Uz",
  userdata: JSON.parse(sessionStorage.getItem("userdata")!) || {
    email: "",
    fio: "",
    id: 0,
    is_staff: 0,
    language: "",
    login: "",
    phone: "",
    target_id: null,
    token: "",
    user_roles_id: 0,
  },
  token: JSON.parse(sessionStorage.getItem("token")!) || null,
  user: null,
  isLoggedIn: Boolean(JSON.parse(sessionStorage.getItem("auth")!)) || false,
  dialogStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserdata: (state, action: PayloadAction<IUserdata>) => {
      state.userdata = action.payload;
      sessionStorage.setItem("userdata", JSON.stringify(state.userdata));
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload;
      sessionStorage.setItem("auth", JSON.stringify(state.isLoggedIn));
      sessionStorage.setItem("token", JSON.stringify(state.token));
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setDialog: function (state, action) {
      state.dialogStatus = action.payload;
    },
    logout: (state) => {
      state = initialState;
      sessionStorage.removeItem("userdata");
      sessionStorage.removeItem("auth");
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      location.reload();
      return state;
    },
  },
});

export const {
  setUserdata,
  setToken,
  setUser,
  logout,
  setDialog,
  setLanguage,
} = authSlice.actions;
export default authSlice.reducer;
