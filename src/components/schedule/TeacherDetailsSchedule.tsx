import {
  faAward,
  faClose,
  faGavel,
  faHandshake,
  faTrophy,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getStaff, getTeacherRating } from "../../utils/Requests";
import { useTranslation } from "react-i18next";
import RatingStars from "./RatingStars";

type Props = {
  teachersHemisId: any;
  showDrawer: boolean;
  setShowDrawer: (showDrawer: boolean) => void;
  showAssessment: boolean;
  setShowAssessment: (showAssessment: boolean) => void;
};

const TeacherDetailsSchedule = ({
  teachersHemisId,
  showDrawer,
  setShowDrawer,
  showAssessment,
  setShowAssessment,
}: Props) => {
  const { i18n, t } = useTranslation<string>();
  const [selectedProf, setSelectedProf] = useState<any>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (teachersHemisId) {
      getStaff(1, 10, false, "id", teachersHemisId).then((response) => {
        const data = response.data.rows[0];
        setSelectedProf(data);
      });

      getTeacherRating(1, 10, false, "id", teachersHemisId).then((response) => {
        const sum = response.data.rows?.reduce(
          (total: number, item: any) => total + item.mark,
          0
        );
        setRating(sum / response.data.total);
      });
    }
  }, [teachersHemisId, i18n.language]);

  return (
    <div
      id="drawer-example"
      className={`fixed top-12 right-0 z-40 h-screen p-4 overflow-y-auto transform ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-50 w-[44vw] dark:bg-headerFooterBackground border-l border-t border-gray-300 dark:border-gray-500`}
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-2 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        {t("professorspage.about_professors")}
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
      {selectedProf && teachersHemisId ? (
        <div className="px-2 py-6 ">
          <div className="w-full grid grid-cols-3 items-start place-items-center text-sm text-gray-600 dark:text-gray-300">
            <div className="col-span-2 w-full text-center flex flex-col justify-center items-center">
              <div className="text-xl font-bold p-2 w-[280px]">
                {selectedProf?.second_name +
                  " " +
                  selectedProf?.first_name +
                  " " +
                  selectedProf?.third_name}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                {selectedProf?.position_name}
              </div>
            </div>
            <div className="row-span-2 flex flex-col items-center gap-4">
              <div className="h-56 w-44 mx-2 border border-gray-200 rounded-sm">
                <img
                  src={`http://smart.akadmvd.uz:8088/api/hemis/teacher-img?teacher_id=${teachersHemisId}`}
                  className="w-full h-full rounded-sm"
                />
              </div>

              <RatingStars
                rating={rating}
                setShowAssessment={setShowAssessment}
              />
            </div>
            <div>
              <div className="w-full text-center mt-2">
                <div className="py-2">
                  {t("professorspage.academic_degree")}
                </div>
                <div className="w-full bg-white bg-font-medium p-3 rounded-lg shadow-2xl inline-flex items-center justify-between min-w-[160px] h-20 border-b-8 border-[#14059c] dark:border-toggleBackground">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground text-lg"
                    icon={faUserGraduate}
                  />
                  <span className="text-black px-2 text-md">
                    {selectedProf?.academic_degree_name}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center mt-2">
                <div className="py-2">
                  {t("professorspage.scientific_title")}
                </div>
                <div className="bg-white font-medium p-3 rounded-lg shadow-2xl inline-flex items-center justify-between min-w-[160px] h-20 border-b-8 border-[#14059c] dark:border-toggleBackground">
                  <FontAwesomeIcon
                    className="text-[#14059c] dark:text-toggleBackground text-lg"
                    icon={faAward}
                  />
                  <span className="text-black  text-md">
                    {selectedProf?.academic_rank_name}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-8 text-center">
                <div className="py-2">{t("professorspage.encouragement")}</div>
                <div className="bg-white font-medium text-2xl p-3 rounded-lg shadow-2xl inline-flex items-center justify-between min-w-[160px] h-20 border-b-8 border-[#3059a3] dark:border-[#6aa2ec]">
                  <FontAwesomeIcon
                    className="text-[#3059a3] dark:text-[#6aa2ec]"
                    icon={faHandshake}
                  />
                  <span className="text-black px-2">0</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-8 text-center">
                <div className="py-2">{t("professorspage.achievements")}</div>
                <div className="bg-white font-medium text-2xl p-3 rounded-lg shadow-2xl inline-flex items-center justify-between min-w-[160px] h-20 border-b-8 border-[#28854f] dark:border-[#56d189]">
                  <FontAwesomeIcon
                    className="text-[#28854f] dark:text-[#56d189]"
                    icon={faTrophy}
                  />
                  <span className="text-black px-2">0</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-8 text-center">
                <div className="py-2">{t("professorspage.punishment")}</div>
                <div className="bg-white font-medium text-2xl p-3 rounded-lg shadow-2xl inline-flex items-center justify-between min-w-[160px] h-20 border-b-8 border-[#9c3131] dark:border-[#dd5c5c]">
                  <FontAwesomeIcon
                    className="text-[#9c3131] dark:text-[#dd5c5c]"
                    icon={faGavel}
                  />
                  <span className="text-black px-2">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="w-full my-3 px-10">
              <table className="w-full border-separate border-spacing-1">
                <thead>
                  <tr className="m-1">
                    <th
                      className="p-2 bg-[#14059c] dark:bg-toggleBackground font-normal text-md text-white dark:text-black rounded-t-lg"
                      colSpan={2}
                    >
                      {t("professorspage.general")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {t("professorspage.birthday")}
                    </td>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {new Date(selectedProf?.birth_date)
                        .getUTCDate()
                        .toString()}
                      .
                      {(new Date(selectedProf?.birth_date).getUTCMonth() + 1)
                        .toString()
                        .padStart(2, "0")}
                      .{new Date(selectedProf?.birth_date).getUTCFullYear()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {t("professorspage.level")}
                    </td>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {selectedProf?.academic_degree_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {t("professorspage.specialty")}
                    </td>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {selectedProf?.position_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {t("professorspage.since_IIO")}
                    </td>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {selectedProf?.year_of_enter}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {t("professorspage.practical_work_experience")}
                    </td>
                    <td className="border p-2 text-gray-600 bg-white font-medium">
                      {new Date().getFullYear() - selectedProf?.year_of_enter}{" "}
                      {t("professorspage.year")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">{t("professorspage.not_found_data")}</div>
      )}
    </div>
  );
};

export default TeacherDetailsSchedule;
