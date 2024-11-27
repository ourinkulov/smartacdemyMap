import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getTopStudents } from "../../utils/Requests";
import { useTranslation } from "react-i18next";
import studentAvatar from "../../assets/avatar.png";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";
import { IDataDashboard } from "redux/dataStored/userReducer";

const SimpleSlider = () => {
  const [topStudents, setTopStudents] = useState<any>();
  const [educationFormId, setEducationFormID] = useState<any>("11");
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation<string>();
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  const avatar = (ev: any) => {
    ev.target.src = studentAvatar;
  };

  useEffect(() => {
    setIsLoading(true);
    getTopStudents(educationFormId)
      .then((response) => {
        setTopStudents(response.data.rows);
      })
      .catch((error) => console.error("Error fetching students:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language, educationFormId]);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow:
      window.screen.width > 1800 ? 3 : window.screen.width > 1300 ? 2 : 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      data-testid="simple-slider"
      className="flex flex-col items-center pt-4 pb-3 lg:pt-8 lg:pb-12 bg-white dark:bg-[#1f2a40] shadow-lg rounded-lg h-full"
    >
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <div className="uppercase font-bold text-base sm:text-lg lg:text-2xl text-slate-600 dark:text-orange-300 text-center">
          {t("mainpage.active students")}
        </div>

        <div className="flex gap-8" data-testid="filter-level">
          <div
            onClick={() => {
              setEducationFormID("11");
            }}
            className={`w-36 text-center p-3 rounded-tl-lg rounded-br-lg ${
              educationFormId == "11"
                ? "bg-[#05219cee] dark:bg-orange-100 text-white"
                : "bg-[#b1b1b1a2] dark:bg-orange-200"
            }  text-black hover:text-white dark:text-black hover:cursor-pointer hover:bg-[#05219cee] dark:hover:bg-orange-100 hover:shadow-lg`}
          >
            <div className="line-clamp-1">{t("bachelor")}</div>
          </div>
          <div
            onClick={() => {
              setEducationFormID("12");
            }}
            className={`w-36 text-center p-3 rounded-tl-lg rounded-br-lg ${
              educationFormId == "12"
                ? "bg-[#05219cee] dark:bg-orange-100 text-white"
                : "bg-[#b1b1b1a2] dark:bg-orange-200"
            }  text-black hover:text-white dark:text-black hover:cursor-pointer hover:bg-[#05219cee] dark:hover:bg-orange-100 hover:shadow-lg`}
          >
            <div className="line-clamp-1">{t("master")}</div>
          </div>
          <div
            onClick={() => {
              setEducationFormID("13");
            }}
            className={`w-36 text-center p-3 rounded-tl-lg rounded-br-lg ${
              educationFormId == "13"
                ? "bg-[#05219cee] dark:bg-orange-100 text-white"
                : "bg-[#b1b1b1a2] dark:bg-orange-200"
            }  text-black hover:text-white dark:text-black hover:cursor-pointer hover:bg-[#05219cee] dark:hover:bg-orange-100 hover:shadow-lg`}
          >
            <div className="line-clamp-1">{t("part-time")}</div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <Slider
            {...settings}
            className={`flex items-center h-[calc(100%-120px)] ${
              isCollapsed ? "w-[calc(100vw-120px)]" : "w-[calc(100vw-250px)]"
            } `}
          >
            {topStudents?.map((student: any, index: number) => {
              return (
                <div className="h-full w-full" key={index}>
                  <div className="h-full md:h-[420px] w-full md:w-[450px] dark:bg-slate-600 lg:h-[470px] lg:w-[500px] mx-auto p-2.5 lg:p-4 pt-3 lg:pt-6 md:rounded-md md:shadow-lg shadow-zinc-200 dark:shadow-zinc-600 flex flex-wrap md:border md:border-b-4 dark:md:border-b-4 border-zinc-300 dark:md:border-0 border-b-[#14059c] dark:border-toggleBackground">
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                      <div className="py-2">
                        <img
                          src={`http://smart.akadmvd.uz:8088/api/hemis/student-img?student_id=${student?.id}`}
                          alt={student?.first_name + student?.second_name}
                          className="object-contain h-40 w-32 lg:h-48 lg:w-36 rounded-md mx-auto"
                          onError={avatar}
                        />
                      </div>
                      <div className="px-2 py-3 text-center max-lg:text-sm font-semibold text-[#2d2c2e] dark:text-orange-300 line-clamp-3 leading-5">
                        {student?.second_name +
                          " " +
                          student?.first_name +
                          " " +
                          student?.third_name}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-0 items-center py-2 max-md:text-sm">
                      <div className="p-1.5 lg:p-2 rounded-br-md rounded-tl-md dark:bg-slate-800 text-black dark:text-white border-[#14059c] dark:border-toggleBackground font-medium flex items-center justify-between w-full md:w-[215px] md:mb-3 lg:mb-5 bg-blue-300">
                        <div className="">{t("mainpage.avg grade")}</div>
                        <div className="text-base md:text-xl lg:text-2xl px-1 text-blue-900 dark:text-white font-bold">
                          {student?.avg_mark
                            ? Number(student?.avg_mark).toFixed(3)
                            : undefined}
                        </div>
                      </div>
                      <div className="p-1.5 lg:p-2 rounded-br-md rounded-tl-md dark:bg-slate-800 text-black dark:text-white  border-[#14059c] dark:border-toggleBackground font-medium flex items-center justify-between w-full md:w-[215px] md:mb-3 lg:mb-5 bg-green-200">
                        {educationFormId == "11" ? (
                          <div>{t("mainpage.bachelor ranking")}</div>
                        ) : educationFormId == "12" ? (
                          <div>{t("mainpage.master ranking")}</div>
                        ) : (
                          <div>{t("mainpage.part-time ranking")}</div>
                        )}
                        <div className="text-base md:text-xl lg:text-2xl px-1 text-green-800 dark:text-white font-bold ml-2">
                          {student?.rating_place}
                        </div>
                      </div>
                      <div className="p-1.5 lg:p-2 rounded-br-md rounded-tl-md shadow-md dark:bg-slate-800 text-black dark:text-white border-[#14059c] dark:border-toggleBackground font-medium flex items-center justify-between w-full md:w-[215px] md:mb-3 lg:mb-5 bg-orange-300">
                        <div>{t("mainpage.grade")}</div>
                        <div className="text-base md:text-xl lg:text-2xl px-1 text-orange-800 dark:text-white font-bold">
                          {student?.course}
                        </div>
                      </div>
                      <div className="p-1.5 lg:p-2 rounded-br-md rounded-tl-md shadow-md dark:bg-slate-800 text-black dark:text-white  border-[#14059c] dark:border-toggleBackground font-medium flex items-center justify-between w-full md:w-[215px] bg-yellow-300">
                        <div>{t("mainpage.groups")}</div>
                        <div className="ftext-base md:text-xl lg:text-[16px] px-1 text-yellow-700 dark:text-white font-bold line-clamp-3">
                          {student?.group_name?.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                    <div className="p-1 sm:p-2 my-2 lg:my-4 rounded-br-md rounded-tl-md dark:shadow-md dark:bg-slate-700 text-black dark:text-white border-[#14059c] dark:border-toggleBackground font-medium max-md:text-sm flex items-center justify-center w-full">
                      <div className="line-clamp-1 text-center font-semibold">
                        {student?.faculty_name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </>
      )}
    </div>
  );
};

export default SimpleSlider;
