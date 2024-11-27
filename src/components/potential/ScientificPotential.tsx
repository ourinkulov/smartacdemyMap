import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaffList } from "../../utils/Requests";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import maleAvatar from "../../assets/male_teacher.jpg";
import femaleAvatar from "../../assets/female_teacher.jpg";
import Loader from "../../utils/Loader";

export default function ScientificPotential() {
  const { t, i18n } = useTranslation();
  const [teachers, setTeachers] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [size, setSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gender, setGender] = useState<number>(-1);
  const [degreeType, setDegreeType] = useState<number>(-1);
  const [titleType, setTitleType] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);

  const avatar = (e: any, gender: number) => {
    e.target.src = gender == 11 ? maleAvatar : femaleAvatar;
  };

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

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(Number(event.target?.value));
  };

  const handleDegreeTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDegreeType(Number(event.target?.value));
  };

  const handleTitleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTitleType(Number(event.target?.value));
  };

  useEffect(() => {
    getStaffList(
      currentPage,
      size,
      false,
      "user_order",
      gender,
      degreeType,
      titleType,
      1
    )
      .then((response) => {
        const uniqueIds = new Set();
        const uniqueData = response.data.rows.filter((item: any) => {
          const isDuplicate = uniqueIds.has(item.id);
          uniqueIds.add(item.id);
          return !isDuplicate;
        });
        setTeachers(uniqueData);
        setTotal(response.data.total);
      })
      .catch((error) => console.error("Error fetching semesters:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language, currentPage, size, gender, degreeType, titleType]);

  return (
    <>
      <div className="w-full flex items-center justify-between border-b border-[#14059c] dark:border-white">
        <div className="font-semibold uppercase line-clamp-1">
          {t("scientific potential")}
        </div>
        <div className="flex">
          <label
            htmlFor="selectTitle"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            <select
              id="selectTitle"
              name="selectTitle"
              value={titleType}
              onChange={handleTitleTypeChange}
              className="block m-1 px-2 py-1 text-sm bg-transparent hover:cursor-pointer dark:hover:bg-slate-700 dark:hover:rounded-lg"
            >
              <option key={1001} value={-1} className="dark:bg-slate-700">
                {t("professorspage.scientific_title")}
              </option>
              <option key={1} value={13} className="dark:bg-slate-700">
                {t("professorspage.professor")}
              </option>
              <option key={2} value={11} className="dark:bg-slate-700">
                {t("professorspage.docent")}
              </option>
              <option key={3} value={12} className="dark:bg-slate-700">
                {t("professorspage.lead researcher")}
              </option>
              <option key={4} value={10} className="dark:bg-slate-700">
                {t("professorspage.without title")}
              </option>
            </select>
          </label>
          <label
            htmlFor="selectDegree"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            <select
              id="selectDegree"
              name="selectDegree"
              value={degreeType}
              onChange={handleDegreeTypeChange}
              className="block m-1 px-2 py-1 text-sm bg-transparent hover:cursor-pointer dark:hover:bg-slate-700 dark:hover:rounded-lg"
            >
              <option key={1002} value={-1} className="dark:bg-slate-700">
                {t("professorspage.academic_degree")}
              </option>
              <option key={1} value={12} className="dark:bg-slate-700">
                {t("professorspage.dsc")}
              </option>
              <option key={2} value={11} className="dark:bg-slate-700">
                {t("professorspage.phd")}
              </option>
              <option key={33} value={10} className="dark:bg-slate-700">
                {t("professorspage.without degree")}
              </option>
            </select>
          </label>
          <label
            htmlFor="selectGender"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            <select
              id="selectGender"
              name="selectGender"
              value={gender}
              onChange={handleGenderChange}
              className="block m-1 px-2 py-1 text-sm bg-transparent hover:cursor-pointer dark:hover:bg-slate-700 dark:hover:rounded-lg"
            >
              <option key={1001} value={-1} className="dark:bg-slate-700">
                {t("gender")}
              </option>
              <option key={1} value={11} className="dark:bg-slate-700">
                {t("man")}
              </option>
              <option key={2} value={12} className="dark:bg-slate-700">
                {t("woman")}
              </option>
            </select>
          </label>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full h-full xl:overflow-y-auto flex flex-wrap justify-between gap-x-1 px-1">
            {teachers?.map((teacher: any) => {
              return (
                <div
                  key={teacher.id}
                  className="w-[165px] h-[220px] border border-slate-200 dark:border-slate-700 rounded-lg my-2 group relative hover:cursor-pointer"
                >
                  <div className="z-20 w-full text-[12px] text-center bg-[#2845c5b0] text-white dark:bg-slate-600 rounded-b-lg group-hover:shadow-lg absolute bottom-0">
                    <div>
                      {teacher.second_name} {teacher.first_name}
                    </div>
                    <div>{teacher.third_name}</div>
                    <div className="text-[10px] hidden group-hover:block">
                      {teacher.position_name}
                    </div>
                    <div className="text-[10px] hidden group-hover:block">
                      {teacher.academic_degree_name}
                    </div>
                    <div className="text-[10px] hidden group-hover:block">
                      {teacher.academic_rank_name}
                    </div>
                  </div>
                  <img
                    src={`http://smart.akadmvd.uz:8088/api/hemis/teacher-img?teacher_id=${teacher?.id}`}
                    alt={teacher!.teacher_name}
                    className="w-full h-full rounded-lg"
                    onError={(e) => avatar(e, teacher._gender)}
                  />
                </div>
              );
            })}
          </div>
          <nav
            className="w-full px-2 flex flex-column items-center dark:bg-headerFooterBackground flex-wrap md:flex-row justify-between py-2"
            aria-label="Table navigation"
          >
            <div className="text-sm font-normal mb-4 md:mb-0 block w-full md:inline md:w-auto">
              <span className="mr-2">{t("testcenterpage.showing")}</span>
              <span className="font-semibold mr-2">
                {size * (currentPage - 1) + 1} - {currentPage * size}
              </span>
              <span className="mr-2">{t("testcenterpage.of")}</span>
              <span className="font-semibold">{total}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="mr-2">{t("testcenterpage.recordssize")}</div>
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
        </>
      )}
    </>
  );
}
