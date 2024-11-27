import {
  faAreaChart,
  faBarChart,
  faClose,
  faGavel,
  faHandshake,
  faLineChart,
  faListOl,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import img from "../../assets/face-recognition.png";
import {
  getStudentsDiscipline,
  getStudentsRatingDegree,
} from "../../utils/Requests";
import BarPerformance from "./BarPerformance";
import LineChart from "./LineChart";
import studentAvatar from "../../assets/avatar.png";

export type Student = {
  id: number;
  student_id: number;
  first_name: string;
  student_fio: string;
  second_name: string;
  third_name: string;
  student_id_number: string;
  birth_date: string;
  passport_number: string;
  passport_date: string;
  passport_pin: string;
  get_gender: string;
  home_address: string;
  current_address: string;
  year_of_enter: number;
  image: string;
  gender: string;
  citizenship: string;
  province: string;
  district: string;
  faculty_name: string;
  education_type: string;
  education_from: string;
  education_year: string;
  course: string;
  group_name: string;
  avg_mark: number;
  rating_place: number;
  course_id: number;
};

type Props = {
  showDrawer: any;
  setShowDrawer: (showDrawer: boolean) => void;
  selectedStudent: Student | null;
  educationTypeId: number;
  educationFormId: number;
};

const StudentInfo = ({
  showDrawer,
  setShowDrawer,
  selectedStudent,
  educationTypeId,
  educationFormId,
}: Props) => {
  const [disciplineData, setDisciplineData] = useState<any>([]);
  const [ratingDegreeData, setRatingDegreeData] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const { i18n, t } = useTranslation<string>();
  const avatar = (ev: any) => {
    ev.target.src = studentAvatar;
  };

  useEffect(() => {
    if (selectedStudent) {
      getStudentsDiscipline(selectedStudent!.student_id)
        .then((response) => {
          setDisciplineData(response.data.rows);
        })
        .catch((error) => console.error("Error fetching students:", error));

      if (educationTypeId == 11 && educationFormId == 13) {
        getStudentsRatingDegree(
          selectedStudent!.student_id,
          educationTypeId,
          educationFormId
        )
          .then((response) => {
            setRatingDegreeData(response.data);
          })
          .catch((error) => console.error("Error fetching students:", error));
      } else {
        getStudentsRatingDegree(
          selectedStudent!.student_id,
          educationTypeId,
          -1
        )
          .then((response) => {
            setRatingDegreeData(response.data);
          })
          .catch((error) => console.error("Error fetching students:", error));
      }

      setImageSrc(
        `http://smart.akadmvd.uz:8088/api/hemis/student-img?student_id=${
          selectedStudent!.student_id
        }`
      );
    }
  }, [selectedStudent, educationTypeId, i18n.language]);

  return (
    <div
      id="drawer-example"
      className={`fixed top-12 right-0 z-40 h-screen overflow-y-auto transform ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-50 w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[35vw] dark:bg-headerFooterBackground border-l border-t border-gray-300 dark:border-gray-500`}
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <div className="sticky top-0 right-0 left-0 bg-gray-50 dark:bg-headerFooterBackground p-4">
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-2 text-base font-semibold text-black dark:text-white uppercase"
        >
          {educationTypeId == 11 && educationFormId != 13
            ? (t("bachelorpage.student_data") as string)
            : (t("masterpage.student_data") as string)}
        </h5>

        <hr className="h-px bg-gray-300 border-0 dark:bg-gray-400"></hr>
        <button
          type="button"
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            setShowDrawer(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} size={"lg"} />
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      {selectedStudent && (
        <div className="px-4 pb-4 mb-8">
          <div className="flex justify-center">
            <div className="w-full grid grid-cols-3 items-end place-items-center text-sm text-gray-600 dark:text-gray-300">
              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("mainpage.academy ranking") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-lg inline-flex items-center justify-between w-[110px] border-b-8 border-[#14059c] dark:border-toggleBackground">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground"
                    icon={faAreaChart}
                  />
                  <span className="text-black dark:text-white ">
                    {ratingDegreeData?.rating_by_academy}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("bachelorpage.encouragement") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-2xl inline-flex items-center justify-between w-[110px] border-b-8 border-green-600 dark:border-green-400">
                  <FontAwesomeIcon
                    className="text-green-600 dark:text-green-400"
                    icon={faHandshake}
                  />
                  <span className="text-black px-2 dark:text-white ">
                    {disciplineData[0]?.student_dm}
                  </span>
                </div>
              </div>

              <div className="col-span-1 row-span-2 flex flex-col justify-between h-full">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={selectedStudent!.student_fio}
                    className="rounded-sm h-40 w-30 mt-4 border border-gray-200 mx-auto"
                    onError={avatar}
                  />
                ) : (
                  <img
                    src={img}
                    alt={selectedStudent!.student_fio}
                    className="rounded-sm h-56 w-40 border border-gray-200 mx-auto"
                    onError={avatar}
                  />
                )}

                <div className="text-center px-2 py-2 font-semibold text-md self-start">
                  {selectedStudent!.student_fio}
                </div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("bachelorpage.average_by_course") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-lg inline-flex items-center justify-between w-[110px] border-b-8 border-[#14059c] dark:border-toggleBackground">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground"
                    icon={faListOl}
                  />
                  <span className="text-black dark:text-white ">
                    {ratingDegreeData?.rating_by_course}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("bachelorpage.punishment") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-2xl inline-flex items-center justify-between w-[110px] border-b-8 border-red-600 dark:border-red-400">
                  <FontAwesomeIcon
                    className="text-red-600 dark:text-red-400"
                    icon={faGavel}
                  />
                  <span className="text-black px-2 dark:text-white ">
                    {disciplineData[1]?.student_dm}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("bachelorpage.average_by_group") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-2xl inline-flex items-center justify-between w-[110px] border-b-8 border-[#14059c] dark:border-toggleBackground">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground"
                    icon={faLineChart}
                  />
                  <span className="text-black dark:text-white">
                    {ratingDegreeData?.rating_by_group}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("professorspage.achievements") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-2xl inline-flex items-center justify-between w-[110px] border-b-8 border-orange-400 dark:border-orange-300">
                  <FontAwesomeIcon
                    className="text-orange-400 dark:text-orange-300"
                    icon={faTrophy}
                  />
                  <span className="text-black px-2 dark:text-white ">
                    {disciplineData[2]?.student_dm}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="py-2 leading-4 text-black dark:text-white">
                  {t("bachelorpage.score_ranking") as string}
                </div>
                <div className="bg-white dark:bg-slate-500 font-medium text-2xl p-2 py-4 rounded-lg shadow-2xl inline-flex items-center justify-between w-[110px] border-b-8 border-[#14059c] dark:border-toggleBackground">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground"
                    icon={faBarChart}
                  />
                  <span className="text-black dark:text-white">
                    {ratingDegreeData?.avg_grade}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-black dark:text-white mb-2.5 font-semibold">
              {t("mainpage.avg grade") as string}
            </div>
            <hr />
            <BarPerformance
              selectedStudentId={selectedStudent!.student_id}
              educationTypeId={educationTypeId}
              educationFormId={educationFormId}
            />
          </div>

          <div className="mt-5">
            <div className="text-black dark:text-white mb-2.5 font-semibold">
              {educationTypeId == 11
                ? (t("bachelorpage.average_by_semestr") as string)
                : (t("masterpage.average_by_semestr") as string)}
            </div>
            <hr />
            <LineChart
              selectedStudentId={selectedStudent!.student_id}
              educationTypeId={educationTypeId}
              educationFormId={educationFormId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
