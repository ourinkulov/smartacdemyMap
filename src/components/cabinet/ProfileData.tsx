import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IAuth, setUserdata } from "../../redux/dataStored/authReducer";
import axiosInstance from "../../utils/AxiosInstance";
import { useTranslation } from "react-i18next";

const ProfileData: React.FC = () => {
  const userdata = useSelector((state: IAuth) => state.auth.userdata);
  const { t } = useTranslation<string>();

  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    id: userdata.id,
    fio: userdata.fio,
    email: userdata.email,
    phone: userdata.phone,
  });

  const handleProfileDataChange = (
    field: keyof typeof profileData,
    value: string | number
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const saveProfileData = () => {
    axiosInstance
      .put("/users/change-profile-data", profileData)
      .then(() => {
        toast.success(t("success"));
        setProfileData({ ...profileData });
        dispatch(
          setUserdata({
            ...userdata,
            id: profileData.id,
            fio: profileData.fio,
            email: profileData.email,
            phone: profileData.phone,
          })
        );
      })
      .catch((error) => console.error("Error fetching org-structure:", error));
  };

  return (
    <div className="w-1/3 max-lg:w-full">
      <span className="text-lg font-bold">{t("cabinetpage.userdata")}</span>
      <div className="flex flex-col mt-2">
        <input
          type="text"
          placeholder={t("cabinetpage.name")}
          value={profileData.fio}
          onChange={(e) => handleProfileDataChange("fio", e.target.value)}
          className="border p-2 mb-2 bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          placeholder={t("cabinetpage.email")}
          value={profileData.email}
          onChange={(e) => handleProfileDataChange("email", e.target.value)}
          className="border p-2 mb-2 bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          placeholder={t("cabinetpage.phone")}
          value={profileData.phone}
          onChange={(e) => handleProfileDataChange("phone", e.target.value)}
          className="border p-2 mb-2 bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={saveProfileData}
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          {t("cabinetpage.savedata")}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfileData;
