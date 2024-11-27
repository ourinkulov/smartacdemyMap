import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  fileUpload,
  getFaculties,
  getGroups,
  testformSend,
} from "../../utils/Requests";
import toast from "react-hot-toast";

function FileDialog(props: any) {
  const { i18n, t } = useTranslation<string>();
  const [groupId, setGroupId] = useState<number>(11);
  const [facultyId, setFacultyId] = useState<number>(4);
  const [groupData, setGroupData] = useState<any>([]);
  const [groupStat, setGroupStat] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [faculties, setFaculties] = useState<any>([]);
  const [resourceId, setResourceId] = useState<number>(-1);

  useEffect(() => {
    getFaculties()
      .then((response) => {
        setFaculties(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    getGroups(facultyId, -1)
      .then((response) => {
        setGroups(response.data.rows);
        setGroupId(response.data.rows[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [facultyId, i18n.language]);

  function getBase64(file: any) {
    var fileReader = new FileReader();
    if (file) {
      fileReader.readAsArrayBuffer(file);
    }
    return new Promise((resolve, reject) => {
      fileReader.onload = function (event) {
        resolve(event.target?.result);
      };
    });
  }

  async function handleUploadChange(event: any) {
    if (event.target.files[0]) {
      let data = new FormData();
      data.append("file", event.target.files[0]);

      await fileUpload(data)
        .then((response) => {
          if (response.status == 200) {
            setResourceId(Number(response.data));
            toast.success(t("uploaded"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error(t("form_error"));
    }
  }

  async function sendForm() {
    if (resourceId != -1 && resourceId != null) {
      await testformSend(resourceId)
        .then((response) => {
          if (response.status == 200) {
            toast.success(t("success"));
            props.setShowUpload(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setGroupId(Number(event.target.value));
  // };

  // const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFacultyId(Number(event.target.value));
  // };

  return (
    <Transition
      show={props.showUploadFile}
      enter="transition duration-5000 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-5000 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform opacity-0"
      as={Fragment}
    >
      <Dialog
        onClose={() => props.setShowUploadFile(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md">
            <div className="flex justify-between items-center text-white p-2 rounded-t-lg bg-[#14059c] dark:bg-headerFooterBackground">
              <Dialog.Title className="text-md font-semibold">
                {t("testcenterpage.add_information")}
              </Dialog.Title>

              <XMarkIcon
                className="h-6 w-6 hover:cursor-pointer hover:bg-red-500 hover:rounded-md"
                onClick={() => props.setShowUploadFile(false)}
              />
            </div>

            <div className="p-4">
              <div className="m-2 p-4 border-2 border-green-300 rounded-lg">
                <div className="mb-2">
                  {t("testcenterpage.fill_example_form")}
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div>{t("testcenterpage.click_to_download")}</div>
                  <a
                    href="../assets/student_exam_performance.xlsx"
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    {t("testcenterpage.download")}
                  </a>
                </div>
              </div>
              <div className="m-4">{t("testcenterpage.attach_file")}</div>
              <div className="ml-4 flex justify-between items-center hover:underline hover:cursor-pointer">
                <label
                  className="flex pb-2 gap-2 items-center"
                  htmlFor="file_input"
                >
                  <PaperClipIcon className="h-5 w-5" />
                  <div className="text-[16px]">
                    {t("testcenterpage.attachment")} (.xls | .xlsx)
                  </div>
                </label>
                <input
                  type="file"
                  id="file_input"
                  name="file_input"
                  className="opacity-0 absolute"
                  onChange={handleUploadChange}
                  accept=".xlsx, .xls, .csv, .pdf"
                />
              </div>
            </div>

            {/* <div className="w-full flex flex-wrap items-center px-4">
              <label
                htmlFor="select"
                className="block text-sm font-medium text-gray-700 dark:text-white px-2"
              >
                {t("bachelorpage.faculty") as string}:
                <select
                  id="select"
                  name="select"
                  value={facultyId}
                  onChange={handleFacultyChange}
                  className="w-full mt-1 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
                >
                  {faculties?.map((faculty: any, index: number) => {
                    return (
                      <option key={index} value={faculty.id}>
                        {faculty.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label
                htmlFor="select"
                className="w-full block text-sm font-medium text-gray-700 dark:text-white p-2"
              >
                {t("mainpage.groups") as string}:
                <select
                  id="select"
                  name="select"
                  value={groupId}
                  onChange={handleGroupChange}
                  className="w-full mt-1 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
                >
                  {groups?.map((group: any, index: number) => {
                    return (
                      <option key={index} value={group.id}>
                        {group.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <div > 
                  <input type="date" className="w-full" />
              </div>
            </div> */}

            <div className="p-4 flex justify-end">
              <button
                className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                onClick={() => props.setShowUploadFile(false)}
              >
                {t("testcenterpage.cancel")}
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={sendForm}
              >
                {t("testcenterpage.confirm")}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default FileDialog;
