import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IAuth } from "redux/dataStored/authReducer";
import axiosInstance from "../../utils/AxiosInstance";
import { useTranslation } from "react-i18next";

const PasswordChange: React.FC = () => {
  const { t } = useTranslation<string>();
  const userdata = useSelector((state: IAuth) => state.auth.userdata);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    axiosInstance
      .post("/users/change-password", null, {
        params: {
          users_id: userdata.id,
          old_password: oldPassword,
          new_password: newPassword,
        },
      })
      .then(() => {
        toast.success(t("success"));
        setOldPassword("");
        setNewPassword("");
      })
      .catch(() => toast.error(t("error")));
  };

  return (
    <div className="my-8 w-1/3 max-lg:w-full">
      <span className="text-lg font-bold">
        {t("cabinetpage.changepassword")}
      </span>
      <div className="flex flex-col mt-2">
        <input
          placeholder={t("cabinetpage.oldpassword")}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 mb-2 bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          placeholder={t("cabinetpage.newpassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 mb-2 bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          {t("cabinetpage.changepassword")}
        </button>
      </div>
    </div>
  );
};

export default PasswordChange;
