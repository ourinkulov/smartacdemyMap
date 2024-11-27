import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IAuth } from "redux/dataStored/authReducer";

const UserData: React.FC = () => {
  const { t } = useTranslation<string>();
  const userdata = useSelector((state: IAuth) => state.auth.userdata);

  return (
    <div className="mb-4  w-1/3 max-xl:w-full">
      <span className="text-lg font-bold">{t("cabinetpage.userdata")}</span>
      <div className="mt-2">
        <div className="text-lg flex justify-between">
          <span>{t("cabinetpage.fio")}:</span> <span>{userdata.fio}</span>
        </div>
        <hr />
        <div className="text-lg flex justify-between">
          <span>{t("cabinetpage.email")}:</span> <span>{userdata.email}</span>
        </div>
        <hr />
        <div className="text-lg flex justify-between">
          <span>{t("cabinetpage.phone")}:</span> <span>{userdata.phone}</span>
        </div>
        <hr />
        <div className="text-lg flex justify-between">
          <span>{t("cabinetpage.login")}: </span> <span> {userdata.login}</span>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default UserData;
