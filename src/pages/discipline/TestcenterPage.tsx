import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getExamTypes,
  getFaculties,
  getGroups,
  getPerformance,
  getSemesters,
  getSubjects,
} from "../../utils/Requests";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import FileDialog from "../../components/discipline/FileDialog";
import { ThemeContext } from "../../theme/ThemeContext";
import { Toaster } from "react-hot-toast";
import { IDataDashboard } from "redux/dataStored/userReducer";
import { useSelector } from "react-redux";

export default function TestcenterPage() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [size, setSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showUploadFile, setShowUploadFile] = useState<boolean>(false);
  const { t, i18n } = useTranslation<string>();
  // filters
  const [educationType, setEducationType] = useState<number>(11);
  const [groupId, setGroupId] = useState<any>();
  const [groups, setGroups] = useState<any>([]);
  const [facultyId, setFacultyId] = useState<any>();
  const [faculties, setFaculties] = useState<any>([]);
  const [subjectId, setSubjectId] = useState<any>();
  const [subjectInfo, setSubjectInfo] = useState<any>([]);
  const [semesters, setSemesters] = useState<any>([]);
  const [semesterId, setSemesterId] = useState<any>();
  const [exampTypeId, setExamTypeId] = useState<any>();
  const [examTypeInfo, setExamTypeInfo] = useState<any>([]);

  useEffect(() => {
    getGroups(facultyId, -1)
      .then((response) => {
        setGroups(response.data.rows);
        // setGroupId(
        //   !isNaN(response.data.rows[1]?.id) ? response.data.rows[1]?.id : 0
        // );
      })
      .catch((error) => {
        console.log(error);
      });

    getFaculties()
      .then((response) => {
        setFaculties(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    getSubjects().then((response) => {
      setSubjectInfo(response.data.rows);
      // setGroupId(
      //   !isNaN(response.data.rows[0]?.id) ? response.data.rows[0]?.id : 0
      // );
    });
  }, [i18n.language, facultyId, educationType]);

  useEffect(() => {
    getExamTypes(1, 20, false, "id")
      .then((response) => {
        setExamTypeInfo(response.data.rows);
        // setExamTypeId(
        //   !isNaN(response.data.rows[0]?.code) ? response.data.rows[0]?.code : 0
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [i18n.language]);

  useEffect(() => {
    getSemesters(educationType)
      .then((response) => {
        setSemesters(response.data.rows);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  }, [i18n.language]);

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupId(Number(event.target?.value));
  };

  const handleSemesterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSemesterId(Number(event.target?.value));
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubjectId(Number(event.target?.value));
  };

  const handleEducationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEducationType(Number(event.target?.value));
  };

  const handleExamTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExamTypeId(Number(event.target?.value));
  };

  // page navigator
  const firstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const lastPage = () => {
    if (total > currentPage * size) {
      setCurrentPage(Math.ceil(total / size));
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (total > currentPage * size) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(event.target?.value));
  };

  const addFile = () => {
    setShowUploadFile(true);
  };

  useEffect(() => {
    getPerformance(
      currentPage,
      size,
      false,
      "id",
      educationType,
      exampTypeId,
      groupId,
      semesterId,
      subjectId
    )
      .then((response) => {
        setTotal(response.data.total);
        setData(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    currentPage,
    size,
    educationType,
    groupId,
    semesterId,
    subjectId,
    exampTypeId,
  ]);

  return (
    <div
      className={`bg-white dark:bg-gray-700 p-2 2xl:p-4 border dark:border-none mx-6 rounded-lg h-[calc(100vh-65px)] ${
        isCollapsed ? "w-[calc(100vw-132px)]" : "w-[calc(100vw-272px)]"
      }`}
    >
      <div className="flex mx-4 justify-between items-center">
        <div className="font-semibold uppercase xl:hidden 3xl:block">
          {t("test center")}
        </div>
        <div className="flex gap-2 items-center">
          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            <select
              id="select"
              name="select"
              value={educationType}
              onChange={handleEducationTypeChange}
              className="block m-1 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
            >
              <option key={1} value={11}>
                {t("bachelor")}
              </option>
              <option key={2} value={12}>
                {t("master")}
              </option>
            </select>
          </label>

          <label
            htmlFor="select"
            className="flex items-center text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("mainpage.groups") as string}:
            <select
              id="select"
              name="select"
              value={!Number.isNaN(groupId) ? groupId : 0}
              onChange={handleGroupChange}
              className="flex w-32 m-1 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
            >
              <option key={1001} value={-1}>
                {t("all")}
              </option>
              {groups?.map((group: any, index: number) => {
                return (
                  <option key={index} value={group?.id}>
                    {group.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label
            htmlFor="select"
            className="flex items-center text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("bachelorpage.semestr") as string}:
            <select
              id="select"
              name="select"
              value={!Number.isNaN(semesterId) ? semesterId : 0}
              onChange={handleSemesterChange}
              className="text-ellipsis px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
            >
              <option key={1002} value={-1}>
                {t("all")}
              </option>
              {semesters?.map((semester: any, index: number) => {
                return (
                  <option key={index} value={semester.code}>
                    {semester.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label
            htmlFor="select"
            className="flex items-center text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("bachelorpage.subjects") as string}:
            <select
              id="select"
              name="select"
              value={!Number.isNaN(subjectId) ? subjectId : 0}
              onChange={handleSubjectChange}
              className="flex text-ellipsis w-48 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
            >
              <option key={1003} value={-1}>
                {t("all")}
              </option>
              {subjectInfo?.map((subject: any, index: number) => {
                return (
                  <option key={index} value={subject?.id}>
                    {subject.subject_name}
                  </option>
                );
              })}
            </select>
          </label>

          <label
            htmlFor="select"
            className="flex items-center text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("testcenterpage.exam_type") as string}:
            <select
              id="select"
              name="select"
              value={!Number.isNaN(exampTypeId) ? exampTypeId : 0}
              onChange={handleExamTypeChange}
              className="flex text-ellipsis w-24 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
            >
              <option key={1004} value={-1}>
                {t("all")}
              </option>
              {examTypeInfo?.map((examtype: any, index: number) => {
                return (
                  <option key={index} value={examtype?.code}>
                    {examtype.name}
                  </option>
                );
              })}
            </select>
          </label>
          <CloudArrowUpIcon
            className="hover:cursor-pointer h-7 w-7"
            onClick={addFile}
          />
        </div>
      </div>
      {total > 0 ? (
        <div className="h-[calc(100%-36px)] w-full overflow-y-scroll">
          <table className="overflow-y-auto h-[calc(100%-48px)] w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300 rounded-lg">
            <thead className="sticky top-0 text-xs uppercase text-white bg-[#14059c] dark:bg-headerFooterBackground">
              <tr className="text-center">
                <th scope="col" className="rounded-tl-lg p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.education_year")}
                  </div>
                </th>
                <th scope="col" className="p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.subject_name")}
                  </div>
                </th>
                <th scope="col" className="p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.exam_type")}
                  </div>
                </th>
                <th scope="col" className="px-3 py-3">
                  <div className="line-clamp-2">{t("testcenterpage.id")}</div>
                </th>
                <th scope="col" className="p-3 xl:hidden 3xl:table-cell">
                  <div className="line-clamp-2">
                    {t("testcenterpage.student_id")}
                  </div>
                </th>
                <th scope="col" className="p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.student_name")}
                  </div>
                </th>
                <th scope="col" className="p-3 xl:hidden 3xl:table-cell">
                  <div className="line-clamp-2">
                    {t("testcenterpage.student_pinfl")}
                  </div>
                </th>
                <th scope="col" className="p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.grade")}
                  </div>
                </th>

                <th scope="col" className="p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.teacher_name")}
                  </div>
                </th>
                <th scope="col" className="p-3">
                  <div className="line-clamp-2">
                    {t("testcenterpage.final_exam_type")}
                  </div>
                </th>
                <th scope="col" className="p-3 xl:hidden 3xl:table-cell">
                  <div className="line-clamp-2">
                    {t("testcenterpage.subject_id")}
                  </div>
                </th>
                <th scope="col" className="p-3 xl:hidden 3xl:table-cell">
                  <div className="line-clamp-2">
                    {t("testcenterpage.exam_schedule_id")}
                  </div>
                </th>
                <th scope="col" className="p-3">
                  <div className="line-clamp-2">{t("testcenterpage.date")}</div>
                </th>
                <th scope="col" className="p-3 rounded-tr-lg">
                  <div className="line-clamp-2">
                    {t("testcenterpage.employee_id")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data?.map((exam: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={`text-black ${
                      (index + 4) % 2 == 0
                        ? "bg-blue-50 dark:bg-orange-200"
                        : "bg-blue-100 dark:bg-orange-300"
                    }  hover:bg-gray-200 dark:hover:bg-orange-100 hover:cursor-pointer`}
                  >
                    <td className="px-2">
                      <div className="font-medium text-center">
                        {exam.education_year}
                      </div>
                    </td>
                    <td className="px-2 text-center">
                      <div className="font-medium line-clamp-2">
                        {exam.subject_name}
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="font-medium text-center">
                        {exam.exam_type_name}
                      </div>
                    </td>
                    <td className="text-center px-2">{exam.id}</td>
                    <td className="px-2 xl:hidden 3xl:table-cell">
                      <div className="font-medium line-clamp-1 text-center">
                        {exam.student_id}
                      </div>
                    </td>
                    <td className="px-2 text-center">
                      <div className="font-medium line-clamp-2 text-center">
                        {exam.student_fio}
                      </div>
                    </td>
                    <td className="xl:hidden 3xl:table-cell">
                      <div className="font-medium line-clamp-1 text-center">
                        {exam.student_pinfl}
                      </div>
                    </td>

                    <td className="px-2">
                      <div className="font-medium text-center">
                        {exam.grade}
                      </div>
                    </td>

                    <td className="px-2">
                      <div className="font-medium text-center line-clamp-2">
                        {exam.teacher_name}
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="font-medium text-center">
                        {exam.final_exam_type_name}
                      </div>
                    </td>
                    <td className="px-2 text-center xl:hidden 3xl:table-cell">
                      <div className="font-medium line-clamp-1">
                        {exam.subject_id}
                      </div>
                    </td>
                    <td className="px-2 xl:hidden 3xl:table-cell">
                      <div className="font-medium text-center">
                        {exam.exam_schedule_id}
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="font-medium text-center">
                        {exam.exam_date}
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="font-medium text-center">
                        {exam.employee_id}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav
            className="sticky bottom-0 flex flex-column items-center text-white bg-[#14059c] dark:bg-headerFooterBackground flex-wrap md:flex-row justify-between p-2 rounded-b-lg shadow-lg"
            aria-label="Table navigation"
          >
            <div className="text-sm font-normalmb-4 md:mb-0 block w-full md:inline md:w-auto">
              <span className="mr-2">{t("testcenterpage.showing")}</span>
              <span className="font-semibold mr-2">
                {size * (currentPage - 1) + 1} - {currentPage * size}
              </span>
              <span className="mr-2">{t("testcenterpage.of")}</span>
              <span className="font-semibold">{total}</span>
            </div>
            <div className="flex items-center gap-4">
              <div>{t("testcenterpage.recordssize")}</div>
              <select
                name="selectSize"
                id="selectSize"
                className="text-sm h-8 px-1 bg-white text-black rounded-lg dark:text-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white"
                onChange={handleSizeChange}
                value={size}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                  <span
                    onClick={firstPage}
                    className={`${
                      currentPage === 1 && "disabled"
                    } hover:cursor-pointer flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 dark:text-white bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white `}
                  >
                    <ChevronDoubleLeftIcon className="h-4 w-4" />
                  </span>
                </li>
                <li>
                  <span
                    onClick={previousPage}
                    className={`${
                      currentPage === 1 && "disabled"
                    } hover:cursor-pointer flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 dark:text-white bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white `}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </span>
                </li>
                <li>
                  <div
                    className={`${
                      currentPage === 1 && "disabled"
                    } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 dark:text-white bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {currentPage}
                  </div>
                </li>
                <li>
                  <div
                    onClick={nextPage}
                    className="hover:cursor-pointer flex items-center justify-center px-2 h-8 leading-tight text-gray-500 dark:text-white bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </li>
                <li>
                  <div
                    onClick={lastPage}
                    className="hover:cursor-pointer  flex items-center justify-center px-2 h-8 leading-tight text-gray-500 dark:text-white bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <ChevronDoubleRightIcon className="h-4 w-4" />
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        <div className="w-full h-full text-center">
          <div className="py-16 w-full text-center font-semibold text-lg">
            <div>{t("testcenterpage.no_information")}</div>
            <div className="w-full flex items-center justify-center mt-4">
              {theme !== "dark" ? (
                <img src="./assets/logogray.png" width={350} />
              ) : (
                <img src="./assets/logopng.png" width={350} />
              )}
            </div>
          </div>
        </div>
      )}

      <FileDialog
        showUploadFile={showUploadFile}
        setShowUploadFile={setShowUploadFile}
      />
      <Toaster />
    </div>
  );
}
