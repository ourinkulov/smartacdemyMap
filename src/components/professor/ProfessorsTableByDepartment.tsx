import React, { useState, useEffect } from "react";
import {
  getTeachersByDepartament,
  getChairs,
  getStatisticByDepartment,
} from "../../utils/Requests";
import {
  faAward,
  faChartColumn,
  faChartLine,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfessorDetailsByDepartment from "./ProfessorDetailsByDepartment";
import ChartDepartment from "./ChartDepartment";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type Teachers = {
  id: number;
  passport_pin: string;
  employee_fio: string;
  rating_place: number;
  rating_ball: number;
  teacher_id: number;
};

type Stats = {
  manager_fio: string;
  manager_academic_degree: string;
  manager_academic_rank: string;
  teachers_cnt: number;
  professor_cnt: number;
  academic_degree_dsc_cnt: number;
  academic_degree_phd_cnt: number;
  academic_degree_ll_cnt: number;
  academic_rank_professor_cnt: number;
  academic_rank_docent_cnt: number;
  academic_rank_untitled_cnt: number;
  chair_rating: number;
  manager_id: number;
};

const ProfessorsTableByDepartment: React.FC = () => {
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [stats, setStats] = useState<Stats>();
  const [faculties, setFaculties] = useState<any>([]);
  const [department_id, setDepartmentId] = useState<number>(10);
  const [selectedTeacher, setSelectedTeacher] = useState<any>({});
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showRadar, setShowRadar] = useState(false);
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    getChairs()
      .then((response) => {
        setFaculties(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    getStatisticByDepartment(department_id, false, "id").then(
      (response: any) => {
        setStats(response.data);
      }
    );
  }, [i18n.language]);

  useEffect(() => {
    getTeachersByDepartament(department_id, false, "id").then(
      (response: any) => {
        setTeachers(response.data.rows);
      }
    );

    getStatisticByDepartment(department_id, false, "id").then(
      (response: any) => {
        setStats(response.data);
      }
    );
  }, [department_id, i18n.language]);

  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentId(Number(event.target.value));
  };
  const handleTeacher = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowDrawer(true);
  };

  return (
    <div className="relative overflow-x-auto flex max-xl:flex-wrap h-full gap-4">
      <div className="w-full xl:w-1/2 h-auto xl:h-full overflow-y-auto py-3 px-5 bg-white dark:bg-slate-700 shadow-lg rounded-lg">
        <div className="w-full flex items-center px-2 2xl:px-4 pb-3 2xl:pb-4 bg-transparent rounded-t">
          <label
            htmlFor="select"
            className="block font-medium text-gray-600 dark:text-white px-1.5"
          >
            {t("professorspage.chair")}:
            <select
              id="select"
              name="select"
              value={department_id}
              onChange={handleFacultyChange}
              className="mt-1 px-1.5 py-1 border-b border-gray-300 text-sm bg-transparent max-w-[350px] 2xl:max-w-[480px]"
            >
              {faculties.map((faculty: any) => {
                return (
                  <option
                    value={faculty.id}
                    key={faculty.id}
                    className="text-gray-600 dark:text-white dark:bg-gray-600"
                  >
                    {faculty.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
            <tr className="text-center bg-[#14059c] text-white dark:bg-toggleBackground dark:text-black">
              <th scope="col" className="px-3 py-3 rounded-tl-lg">
                {t("professorspage.id")}
              </th>
              {/* <th scope="col" className="px-3 py-3">
              Rasm
              </th> */}
              <th scope="col" className="px-3 py-3">
                {t("professorspage.name_surname_middle")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("professorspage.rating")}
              </th>
              <th scope="col" className="px-3 py-3 rounded-tr-lg">
                {t("professorspage.points")}
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => {
              return (
                <tr
                  className={`${
                    teacher.teacher_id === selectedTeacher.teacher_id
                      ? "bg-slate-200 text-black"
                      : "bg-white dark:bg-[#1F2A40]"
                  }  border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center cursor-pointer`}
                  key={index}
                  onClick={() => handleTeacher(teacher)}
                >
                  <td className="p-2">{index + 1}</td>
                  {/* <td className="xl:whitespace-nowrap p-2">
                    <img src={`http://smart.akadmvd.uz:8088/api/hemis/teacher-img?teacher_id=${teacher.id}`} alt="" className="w-6 h-6"/>
                  </td> */}
                  <td className="xl:whitespace-nowrap p-2 text-left">
                    {teacher.employee_fio}
                  </td>
                  <td className="p-2">{teacher.rating_place}</td>
                  <td className="p-2">{teacher.rating_ball}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="w-full xl:w-1/2 h-auto xl:h-full overflow-y-auto p-2 lg:p-3  text-center flex flex-col justify-begin items-center bg-white dark:bg-slate-700 shadow-lg rounded-lg relative">
        <div className="w-full flex items-center justify-between border-b border-[#14059c] dark:border-white">
          <div className="font-semibold uppercase line-clamp-1">
            {t("professorspage.about_chair")}
          </div>
          <div className="h-9"></div>
        </div>

        <div className="w-full flex justify-center p-2">
          <div className="px-2 py-4 text-center">
            <div className="text-gray-600 dark:text-gray-300 font-medium text-base xl:text-lg 2xl:text-xl py-2">
              {t("professorspage.chair_head")}
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-semibold text-base xl:text-lg 2xl:text-xl">
              {stats?.manager_fio ? stats?.manager_fio : ""}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {stats?.manager_academic_degree
                ? stats?.manager_academic_degree
                : "" + ", " + stats?.manager_academic_rank
                ? stats?.manager_academic_rank
                : ""}
            </div>
            <div className="flex justify-center items-center space-x-4 2xl:space-x-10 mt-2">
              <div className="px-3 2xl:px-6 py-2 2xl:py-3 text-center max-w-[300px]">
                <div className="items-center justify-center font-medium text-xl 2xl:text-2xl">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground p-1"
                    icon={faChartColumn}
                    size="xl"
                  />
                  <span className="mx-4 2xl:mx-6 text-gray-700 dark:text-gray-400">
                    {stats?.teachers_cnt}
                  </span>
                </div>
                <div className="text-base text-gray-500 dark:text-gray-300 p-1">
                  {t("professorspage.number_professors")}
                </div>
              </div>
              <div className="px-3 2xl:px-6 py-2 2xl:py-3 text-center max-w-[300px]">
                <div className="items-center justify-between font-medium text-xl 2xl:text-2xl">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground p-1"
                    icon={faChartLine}
                    size="xl"
                  />
                  <span className="mx-4 xl:mx-6 text-gray-700 dark:text-gray-400">
                    {stats?.chair_rating}
                  </span>
                </div>
                <div className="text-base text-gray-500 dark:text-gray-300">
                  {t("professorspage.chair_ranking")}
                </div>
              </div>
            </div>
          </div>
          <div className="img w-[145px] 2xl:w-[175px] h-[175px] 2xl:h-[225px] rounded border border-gray-400 mx-1">
            <img
              className="w-full h-full rounded"
              src={`http://smart.akadmvd.uz:8088/api/hemis/teacher-img?teacher_id=${stats?.manager_id}`}
              width="170"
              height="220"
              alt={stats?.manager_fio}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 2xl:grid-cols-3 items-end px-3 2xl:px-8 w-full">
          <div className="px-2 2xl:px-4 py-1 text-center">
            <div className="p-2 text-base text-gray-600 dark:text-gray-300 2xl:w-[150px] mx-auto leading-5">
              {t("professorspage.chair_doctors")}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-gray-100 text-black font-medium text-2xl px-2 py-4 rounded shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground mx-2"
                icon={faUserGraduate}
                size="lg"
              />
              <span className="mx-2 2xl:mx-4">
                {stats?.academic_degree_dsc_cnt}
              </span>
            </div>
          </div>
          <div className="px-2 2xl:px-4 py-1 text-center">
            <div className="p-2 text-base text-gray-600 dark:text-gray-300 2xl:w-[150px] mx-auto leading-5">
              {t("professorspage.chair_phd")}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-gray-100 text-black font-medium text-2xl px-2 py-4 rounded shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground  mx-2"
                icon={faUserGraduate}
                size="lg"
              />
              <span className="mx-2 2xl:mx-4">
                {stats?.academic_degree_phd_cnt}
              </span>
            </div>
          </div>
          <div className="px-2 2xl:px-4 py-1 text-center">
            <div className="p-2 text-base text-gray-600 dark:text-gray-300 2xl:w-[150px] mx-auto leading-5">
              {t("professorspage.chair_notitle")}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-gray-100 text-black font-medium text-2xl px-2 py-4 rounded shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground  mx-2"
                icon={faUserTie}
                size="lg"
              />
              <span className="mx-2 2xl:mx-4">
                {stats?.academic_degree_ll_cnt}
              </span>
            </div>
          </div>
          <div className="px-2 2xl:px-4 py-1 text-center">
            <div className="p-2 text-base text-gray-600 dark:text-gray-300 2xl:w-[150px] mx-auto leading-5">
              {t("professorspage.professors")}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-gray-100 text-black font-medium text-2xl px-2 py-4 rounded shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground  mx-2"
                icon={faAward}
                size="lg"
              />
              <span className="mx-2 2xl:mx-4">
                {stats?.academic_rank_professor_cnt}
              </span>
            </div>
          </div>
          <div className="px-2 2xl:px-4 py-1 text-center">
            <div className="p-2 text-base text-gray-600 dark:text-gray-300 2xl:w-[150px] mx-auto leading-5">
              {t("professorspage.docents")}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-gray-100 text-black font-medium text-2xl px-2 py-4 rounded shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground  mx-2"
                icon={faAward}
                size="lg"
              />
              <span className="mx-2 2xl:mx-4">
                {stats?.academic_rank_docent_cnt}
              </span>
            </div>
          </div>
          <div className="px-2 2xl:px-4 py-1 text-center">
            <div className="p-2 text-base text-gray-600 dark:text-gray-300 2xl:w-[150px] mx-auto leading-5">
              {t("professorspage.academic_notitle")}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-gray-100 text-black font-medium text-2xl px-2 py-4 rounded shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground  w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground  mx-2"
                icon={faUserTie}
                size="lg"
              />
              <span className="mx-2 2xl:mx-4">
                {stats?.academic_rank_untitled_cnt}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-4 xl:px-8 2xl:px-20 my-8 rounded-lg">
          <div
            className={`flex justify-between hover:cursor-pointer hover:text-white dark:hover:text-black hover:bg-[#14059c] dark:hover:bg-toggleBackground p-2 rounded-t-lg ${
              showRadar
                ? "bg-[#14059c] dark:bg-toggleBackground  text-white dark:text-black"
                : "bg-slate-200  dark:bg-gray-600  "
            }`}
            onClick={() => {
              setShowRadar(!showRadar);
            }}
          >
            <span className="text-base">
              {t("professorspage.department_rating")}
            </span>
            <button type="button">
              <ChevronDownIcon
                className={`h-5 w-5 ${showRadar && "rotate-180"}`}
              />
            </button>
          </div>
        </div>

        {showRadar ? (
          <ChartDepartment department_id={department_id} />
        ) : undefined}
      </div>

      <ProfessorDetailsByDepartment
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        selectedTeacher={selectedTeacher}
      />
    </div>
  );
};

export default ProfessorsTableByDepartment;
