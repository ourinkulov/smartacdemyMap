import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUser,
  setUserdata,
} from "../../redux/dataStored/authReducer";
import axiosInstance from "../../utils/AxiosInstance";
import { TailwindToaster } from "../../utils/Toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import ThemeSelector from "../ThemeSelector";
import { ThemeContext } from "../../theme/ThemeContext";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { t, i18n } = useTranslation<string>();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", null, {
        params: {
          login: username,
          password: password,
        },
      });
      const { token, user } = response.data;
      dispatch(setToken(token));
      dispatch(setUser(user));

      if (response.status === 200) {
        navigate("/");
        await fetchUserDetails();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDetailsResponse = await axiosInstance.get("/users/get-one");
      const userDetails = userDetailsResponse.data;
      dispatch(setUserdata(userDetails));
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  return (
    <div className="flex h-full login">
      <TailwindToaster />
      <div className="w-[73vw] xl:w-[80vw] max-lg:hidden flex flex-col justify- items-center">
        <div className="text-white text-xl xl:text-2xl flex flex-col justify-center items-center mt-10">
          {i18n.language.toString() == "En" || i18n.language == "Ru" ? (
            <>
              <div>{t("academys").toUpperCase()}</div>{" "}
              <div>{t("iiv").toUpperCase()}</div>
            </>
          ) : (
            <>
              <div>{t("iiv").toUpperCase()}</div>
              <div>{t("academys").toUpperCase()}</div>
            </>
          )}
        </div>
        <div className="mt-52">
          <img src="./assets/building_white.png" width={350} />
        </div>
        <div className="text-white text-[60px] m-4 dark:text-white">
          {t("smartacademy").toUpperCase()}
        </div>
        <div className="text-white text-[32px] max-2xl:text-[18px]  dark:text-white">
          {t("platform")}
        </div>
      </div>
      <div className="w-[100vw] lg:w-[27vw] xl:w-[20vw] bg-white p-4 flex flex-col justify-start overflow-auto">
        <div className="flex flex-row justify-end">
          <div className="dark:text-black hover:bg-gray-300 dark:hover:bg-toggleBackground hover:rounded-full dark:hover:text-darkColor">
            <ThemeSelector />
          </div>
          <div className="dark:text-black hover:bg-gray-300 dark:hover:bg-toggleBackground hover:rounded-full dark:hover:text-darkColor">
            <LanguageSelector />
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-8 rounded-lg mt-10">
          <div className="flex justify-center">
            {theme === "dark" ? (
              <img src="./assets/logopng.png" width={300} height={300} />
            ) : (
              <img src="./assets/logogray.png" width={300} height={300} />
            )}
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-black">
              {t("loginpage.enter")}
            </h2>
          </div>
          <div className="mt-10">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-black"
            >
              {t("loginpage.username")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder={t("loginpage.username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#313f85] dark:focus:ring-toggleBackground sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("loginpage.password")}
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                placeholder={t("loginpage.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    handleLogin();
                  }
                }}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#313f85] dark:focus:ring-toggleBackground sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <img src="./assets/face-recognition.png" width={70} />
            <div className="flex flex-col ml-4 text-sm">
              <div className="">{t("loginpage.biometric")}</div>
              <div className="">{t("loginpage.identification")}</div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLogin();
              }}
              className="flex w-full justify-center rounded-md bg-[#313f85] dark:bg-toggleBackground px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm hover:bg-[#262f5e] dark:hover:bg-toggleBackground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:toggleBackground"
            >
              {t("loginpage.login")}
            </button>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
