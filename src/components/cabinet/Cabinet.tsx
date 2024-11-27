import UserData from "./UserData";
import PasswordChange from "./PasswordChange";
import ProfileData from "./ProfileData";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const UserCabinet: React.FC = () => {
  const { t } = useTranslation<string>();
  return (
    <div className="p-8 mx-4 bg-white dark:bg-[#1f2a40] h-[calc(100vh-60px)] rounded-lg shadow-md flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("cabinetpage.usercabinet")}
      </h1>
      <UserData />
      <PasswordChange />
      <ProfileData />
      <Toaster />
    </div>
  );
};

export default UserCabinet;
