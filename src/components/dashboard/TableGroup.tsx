import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getFaculties,
  getGroups,
  getSpecialities,
  getStudentsGroup,
  getStudentsGroupStat,
} from "../../utils/Requests";
import StudentInfo, { Student } from "./StudentInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAreaChart,
  faBarChart,
  faListOl,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type TableGroupProps = {
  educationTypeId: number;
  educationFormId: number;
};

export default function TableGroup(props: TableGroupProps) {
  const { educationTypeId, educationFormId } = props;
  const [groupId, setGroupId] = useState<number>(11);
  const [facultyId, setFacultyId] = useState<number>(4);
  const [specialtyId, setSpecialtyId] = useState<number>(18);
  const [groupData, setGroupData] = useState<any>([]);
  const [groupStat, setGroupStat] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [faculties, setFaculties] = useState<any>([]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const [activeStudent, setActiveStudent] = useState<number>();
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    const fetchFacultiesAndGroups = (
      facultyIdParam: number,
      specialtyIdParam: number
    ) => {
      const fetchFaculties =
        educationTypeId === 11 ? getFaculties() : getSpecialities();

      fetchFaculties
        .then((response) => {
          const temp =
            educationFormId == 13
              ? response.data.rows.filter((x: any) => x.id == 98)
              : response.data.rows.filter((x: any) => x.id != 98);
          setFaculties(temp);
        })
        .catch((error) => {
          console.log(error);
        });
      const fetchGroups =
        educationFormId == 13
          ? getGroups(98, specialtyIdParam)
          : getGroups(facultyIdParam, specialtyIdParam);

      fetchGroups
        .then((response) => {
          if (educationFormId == 13) {
            setFacultyId(98);
            setGroupId(125);
          } else {
            setGroupId(response.data.rows[0]?.id);
          }
          setGroups(response.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (educationTypeId === 11) {
      fetchFacultiesAndGroups(facultyId, -1);
    } else {
      fetchFacultiesAndGroups(-1, specialtyId);
    }
  }, [facultyId, specialtyId, i18n.language]);

  useEffect(() => {
    const fetchGroupData = (
      facultyIdParam: number,
      specialtyIdParam: number
    ) => {
      if (groupId && groups.length > 0) {
        getStudentsGroup(
          facultyIdParam,
          specialtyIdParam,
          groupId,
          educationTypeId,
          educationFormId
        )
          .then((response) => {
            setGroupData(response.data.rows);
          })
          .catch((error) => {
            console.log(error);
          });

        getStudentsGroupStat(groupId, educationTypeId)
          .then((response) => {
            setGroupStat(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    if (educationTypeId === 11) {
      fetchGroupData(facultyId, -1);
    } else {
      fetchGroupData(-1, specialtyId);
    }
  }, [groupId, facultyId, specialtyId, i18n.language]);

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupId(Number(event.target.value));
  };

  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFacultyId(Number(event.target.value));
  };

  const handleSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSpecialtyId(Number(event.target.value));
  };

  const handleStudent = (event: any) => {
    event.stopPropagation();
    setActiveStudent(event.currentTarget.id);

    const id = event.currentTarget.id;
    if (event.currentTarget.tagName === "TR" && id.length > 0) {
      const selected: any = groupData.find(
        (student: any) => student.student_id == id
      );
      setSelectedStudent(selected);
    }
    setShowDrawer(true);
  };

  return (
    <div className="flex h-full gap-4 max-xl:flex-wrap">
      <div className="w-full xl:w-3/5 h-full bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
        <div className="flex flex-wrap items-center pb-3">
          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("bachelorpage.faculty") as string}:
            <select
              id="select"
              name="select"
              value={educationTypeId == 11 ? facultyId : specialtyId}
              onChange={
                educationTypeId == 11
                  ? handleFacultyChange
                  : handleSpecialtyChange
              }
              className="mt-1 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
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
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("mainpage.groups") as string}:
            <select
              id="select"
              name="select"
              value={groupId}
              onChange={handleGroupChange}
              className="mt-1 px-2 py-1 border-b border-gray-300 text-sm bg-transparent dark:bg-slate-700"
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
        </div>
        <table className="h-full w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th
                scope="col"
                className="flex justify-center items-center w-10 py-3 h-full"
              >
                {t("structurepage.id") as string}
              </th>
              <th scope="col" className="">
                {t("bachelorpage.fio") as string}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("bachelorpage.expertise") as string}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("bachelorpage.rating") as string}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("bachelorpage.average_score") as string}
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto h-full">
            {groupData?.map((student: any, index: number) => {
              return (
                <tr
                  className={`${
                    activeStudent == student?.student_id
                      ? "bg-[#cccccc] text-black"
                      : educationTypeId == 11
                      ? student.avg_grade > 3.0
                        ? student.avg_grade > 4.5
                          ? "bg-green-500"
                          : student.avg_grade > 4.0
                          ? "bg-green-200"
                          : "bg-orange-400"
                        : "bg-red-500"
                      : student.avg_grade >= 56.0
                      ? student.avg_grade >= 86.0
                        ? "bg-green-500"
                        : student.avg_grade >= 71.0
                        ? "bg-green-200"
                        : "bg-orange-400"
                      : "bg-red-500"
                  } border-b text-black dark:border-gray-700 hover:bg-[#14059c] hover:text-white dark:hover:bg-toggleBackground text-center cursor-pointer`}
                  key={index}
                  onClick={(e) => {
                    handleStudent(e);
                  }}
                  id={student?.student_id}
                >
                  <td>{index + 1}</td>
                  <td>
                    <div className="font-medium text-left py-1.5">
                      <div className="line-clamp-1">{student.student_fio}</div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5">
                    <div className="font-medium">
                      <div className="line-clamp-1">
                        {student.specialty_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5">
                    <div className="font-medium">{student.rating_place}</div>
                  </td>
                  <td className="px-6 py-1.5">
                    <div className="font-medium">{student.avg_grade}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full xl:w-2/5 h-auto bg-white dark:bg-slate-700 rounded-lg shadow-md p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-x-8 gap-y-4 items-end ">
          <div className="px-3 xl:px-6 py-2 xl:py-3 text-center">
            <div className="xl:mb-2 p-2 text-base xl:text-lg text-gray-500 dark:text-white">
              {educationTypeId == 11
                ? (t("bachelorpage.number_of_cadets") as string)
                : (t("masterpage.number_of_cadets") as string)}
            </div>
            <div className="inline-flex items-center  justify-between bg-slate-200 dark:bg-slate-500 text-black dark:text-white  font-medium text-2xl px-2 py-6 rounded-lg shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground mx-2"
                icon={faUser}
                size="lg"
              />
              <span className="mx-2 xl:mx-4">
                {groupStat?.student_cnt ? groupStat?.student_cnt : 0}
              </span>
            </div>
          </div>
          <div className="px-3 xl:px-6 py-2 xl:py-3 text-center">
            <div className="xl:mb-2 p-2 text-base xl:text-lg text-gray-500 dark:text-white">
              {t("bachelorpage.score_ranking") as string}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-100 dark:bg-slate-500 text-black dark:text-white  font-medium text-2xl px-2 py-6  rounded-lg shadow-lg  border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground mx-2"
                icon={faBarChart}
                size="lg"
              />
              <span className="mx-2 xl:mx-4">
                {groupStat?.avg_grade ? groupStat?.avg_grade : 0}
              </span>
            </div>
          </div>
          <div className="px-3 xl:px-6 py-2 xl:py-3 text-center">
            <div className="xl:mb-2 p-2 text-base xl:text-lg text-gray-500 dark:text-white">
              {t("mainpage.academy ranking") as string}
            </div>
            <div className="inline-flex items-center justify-between bg-slate-200 dark:bg-slate-500 text-black dark:text-white font-medium text-2xl px-2 py-6  rounded-lg shadow-lg border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground mx-2"
                icon={faAreaChart}
                size="lg"
              />
              <span className="mx-2 xl:mx-4">
                {groupStat?.rating_place ? groupStat?.rating_place : 0}
              </span>
            </div>
          </div>
          <div className="px-3 xl:px-6 py-2 xl:py-3 text-center">
            <div className="xl:mb-2 p-2 text-base xl:text-lg text-gray-500 dark:text-white">
              {t("bachelorpage.average_by_course") as string}
            </div>
            <div className="inline-flex justify-between items-center bg-slate-200 dark:bg-slate-500 text-black dark:text-white  font-medium text-2xl px-2 py-6 rounded-lg shadow-lg  border-b-8 border-[#14059c] dark:border-toggleBackground w-[150px]">
              <FontAwesomeIcon
                className="text-[#14059c] dark:text-toggleBackground mx-2"
                icon={faListOl}
                size="lg"
              />
              <span className="text-3xl mx-2 xl:mx-4">
                {groupStat?.rating_place_by_class
                  ? groupStat?.rating_place_by_class
                  : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 px-6 py-3 text-lg">
          <div className="mb-3">
            {educationTypeId == 11
              ? (t("bachelorpage.leading_cadets") as string)
              : (t("masterpage.leading_cadets") as string)}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm xl:text-base">
            <div>{groupData[0]?.student_fio}</div>
            <div>{groupData[1]?.student_fio}</div>
            <div>{groupData[2]?.student_fio}</div>
          </div>
        </div>
      </div>
      <StudentInfo
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        selectedStudent={selectedStudent}
        educationTypeId={educationTypeId}
        educationFormId={educationFormId}
      />
    </div>
  );
}
