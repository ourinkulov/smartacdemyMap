import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IAuth, logout, setDialog } from "../../redux/dataStored/authReducer";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/dataStored/userReducer";

/**
 * Dialog window after confirming user goes to homepage
 * @returns JSX element
 */
export default function ConfirmDialog() {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();
  const dialogStatus = useSelector(
    (state: IAuth) => state.auth.dialogStatus
  ) as boolean;
  const dispatch = useDispatch();

  return (
    <Dialog
      as="div"
      open={dialogStatus}
      onClose={() => dispatch(setDialog(false))}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
    >
      <Dialog.Panel className="flex flex-col bg-white dark:bg-[#1f2a40] items-center justify-center overflow-hidden rounded-2xl px-10 py-12 text-left align-middle shadow-md shadow-[#313f8550] dark:shadow-[#fab039] transition-all">
        <Dialog.Title className="text-xl font-medium leading-6 dark:text-textColor">
          {t("loginpage.leavepage") as string}
        </Dialog.Title>

        <p className="text-md text-gray-500 dark:text-textColor my-8">
          {t("loginpage.sureleavepage") as string}
        </p>
        <div className="flex items-center justify-center max-sm:flex-col">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-[#14059c] text-white dark:bg-toggleBackground dark:text-gray-900 hover:bg-[#353f97] dark:hover:bg-[#fab039] px-4 py-2 text-sm font-medium mx-3 my-1"
            onClick={() => {
              dispatch(setDialog(false));
              dispatch(logout());
              dispatch(reset());
              navigate("/login");
              return;
            }}
          >
            {t("loginpage.confirm") as string}
          </button>
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 mx-3 my-1"
            onClick={() => dispatch(setDialog(false))}
          >
            {t("loginpage.cancel") as string}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
