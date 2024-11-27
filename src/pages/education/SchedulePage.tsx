import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getFaculties,
  getGroups,
  getSpecialities,
  schedule,
} from "../../utils/Requests";
import { ThemeContext } from "../../theme/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import TeacherDetailsSchedule from "../../components/schedule/TeacherDetailsSchedule";
import TeacherAssessment from "../../components/schedule/TeacherAssessment";
import { Toaster } from "react-hot-toast";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any>([]);
  const [showAssessment, setShowAssessment] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<number>(0);
  const [groups, setGroups] = useState<any>([]);
  const [content, setContent] = useState<any>();
  const [facultyId, setFacultyId] = useState<number>(4);
  const [faculties, setFaculties] = useState<any>([]);
  const [date, setDate] = useState<any>("");
  const [educationType, setEducationType] = useState<any>(11);
  const [week, setWeek] = useState<number>(1);
  const { t, i18n } = useTranslation<string>();
  const { theme, setTheme } = useContext(ThemeContext);
  const [showTopic, setShowTopic] = useState({
    status: false,
    topic: "",
    id: 0,
  });

  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [teacherId, setTeacherId] = useState(-1);

  let today = new Date().toLocaleDateString("en-CA");
  let month: any = date?.split("-")[1];
  let months = [
    t("mainpage.January"),
    t("mainpage.February"),
    t("mainpage.March"),
    t("mainpage.April"),
    t("mainpage.May"),
    t("mainpage.June"),
    t("mainpage.July"),
    t("mainpage.August"),
    t("mainpage.September"),
    t("mainpage.October"),
    t("mainpage.November"),
    t("mainpage.December"),
  ];

  useEffect(() => {
    setDate(today);

    const fetchGroups =
      educationType == 11 ? getGroups(facultyId, -1) : getGroups(-1, facultyId);
    fetchGroups
      .then((response) => {
        setGroups(response.data.rows);
        setGroupId(
          !isNaN(response.data.rows[1]?.id) ? response.data.rows[1]?.id : 0
        );
      })
      .catch((error) => {
        console.log(error);
      });

    if (educationType == 11) {
      getFaculties()
        .then((response) => {
          setFaculties(response.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getSpecialities()
        .then((response) => {
          setFaculties(response.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [i18n.language, educationType, facultyId]);

  useEffect(() => {
    let week = Math.ceil(
      (new Date(date).getDate() + ((new Date(date).getDay() + 1) % 7) - 1) / 7
    );
    setWeek(!isNaN(week) ? Number(week) : 0);

    if (groupId) {
      schedule(groupId, date.split("-").reverse().join("."), educationType)
        .then((response: any) => {
          const res = response.data.rows;
          const finalResult = Object.values(
            res.reduce((acc: any, obj: any) => {
              const key = obj.pair_name + "-" + obj.day_number;
              if (!acc[key]) {
                acc[key] = obj;
              }
              return acc;
            }, {})
          );
          setSchedules(finalResult);
        })
        .catch(() => {
          setSchedules([]);
        });
    }
  }, [facultyId, groupId, date, i18n.language, educationType]);

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupId(Number(event.target?.value));
  };

  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFacultyId(Number(event.target?.value));
  };

  const handleEducationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEducationType(Number(event.target?.value));
  };

  const handleDayChange = (e: any) => {
    setDate(e.target?.value);
  };
  const handleWeekChange = (e: any) => {
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    let changedDate = new Date(
      year,
      month,
      1 + (1 + (e.target?.value - 1) * 7 - new Date(year, month, 1).getDay())
    )?.toLocaleDateString("en-CA");
    setDate(changedDate);
  };

  const handleShowTopic = (topic: string, id: number) => {
    if (topic != null && topic != undefined) {
      if (showTopic.id != id) {
        setShowTopic({ status: true, topic: topic, id: id });
      } else {
        setShowTopic({ status: !showTopic.status, topic: topic, id: id });
      }
    }
  };

  const handleTeacherClick = (subject: any) => {
    setContent(subject);
    setTeacherId(subject.employee_id);
    setShowTeacherProfile(true);
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-2 2xl:p-4 mx-4 rounded-lg h-[calc(100vh-65px)] shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <h2 className="font-bold text-2xl">{months[month - 1]}</h2>
        <div className="flex items-end">
          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("mainpage.week") as string}:
            <select
              id="select"
              name="select"
              value={week}
              onChange={handleWeekChange}
              className="m-1 px-2 text-sm bg-transparent dark:bg-slate-700"
            >
              {Array.from(
                {
                  length: Math.ceil(
                    (new Date(
                      date?.split("-")[0],
                      date?.split("-")[1],
                      0
                    ).getDate() +
                      new Date(
                        date?.split("-")[0],
                        date?.split("-")[1] - 1,
                        0
                      ).getDay()) /
                      7
                  ),
                },
                (_, index) => index + 1
              )?.map((weekNum: any, index: number) => {
                return <option key={index}>{weekNum}</option>;
              })}
            </select>
          </label>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            {t("mainpage.lesson_date") as string}:
            <input
              id="date"
              type="date"
              className="m-0.5 px-2 text-sm bg-transparent dark:bg-slate-700 dark:color-white"
              value={date != null ? date : new Date()}
              onChange={handleDayChange}
            />
          </label>

          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            <select
              id="select"
              name="select"
              value={educationType}
              onChange={handleEducationTypeChange}
              className="m-1 px-2text-sm bg-transparent dark:bg-slate-700"
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
            className="block text-sm font-medium text-gray-700 dark:text-white px-2"
          >
            <select
              id="select"
              name="select"
              value={!Number.isNaN(facultyId) ? facultyId : 0}
              onChange={handleFacultyChange}
              className="m-1 px-2 text-sm bg-transparent dark:bg-slate-700"
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
              value={!Number.isNaN(groupId) ? groupId : 0}
              onChange={handleGroupChange}
              className="m-1 px-2 text-sm bg-transparent dark:bg-slate-700"
            >
              {groups?.map((group: any, index: number) => {
                return (
                  <option key={index} value={group?.id}>
                    {group.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
      <div className="h-full w-full overflow-y-scroll">
        {schedules.length ? (
          <table className="table-fixed overflow-y-auto w-full bg-transparent text-sm text-left rtl:text-right text-gray-500">
            <thead className="sticky top-0 w-full text-white bg-[#14059c] dark:bg-[#141B2D] z-10">
              <tr className="w-full">
                <th className="p-2 rounded-tl-lg w-[80px] whitespace-nowrap text-center">
                  {week}
                  <br />
                  {t("mainpage.week") as string}
                </th>
                <th className="p-4 w-[calc(16%)] text-center">
                  {t("mainpage.monday") as string}
                  <div>
                    {schedules?.filter((item: any) => item.day_number == 1)[0]
                      ?.lesson_date
                      ? " (" +
                        schedules
                          ?.filter((item: any) => item.day_number == 1)[0]
                          ?.lesson_date.slice(0, 10) +
                        ")"
                      : ""}
                  </div>
                </th>
                <th className="p-4 w-[calc(16%)] text-center">
                  {t("mainpage.tuesday") as string}
                  <div>
                    {schedules?.filter((item: any) => item.day_number == 2)[0]
                      ?.lesson_date
                      ? " (" +
                        schedules
                          ?.filter((item: any) => item.day_number == 2)[0]
                          ?.lesson_date.slice(0, 10) +
                        ")"
                      : ""}
                  </div>
                </th>
                <th className="p-4 w-[calc(16%)] text-center">
                  {t("mainpage.wednesday") as string}
                  <div>
                    {schedules?.filter((item: any) => item.day_number == 3)[0]
                      ?.lesson_date
                      ? " (" +
                        schedules
                          ?.filter((item: any) => item.day_number == 3)[0]
                          ?.lesson_date.slice(0, 10) +
                        ")"
                      : ""}
                  </div>
                </th>
                <th className="p-4 w-[calc(16%)] text-center">
                  {t("mainpage.thursday") as string}
                  <div>{schedules?.filter((item: any) => item.day_number == 4)[0]
                    ?.lesson_date
                    ? " (" +
                      schedules
                        ?.filter((item: any) => item.day_number == 4)[0]
                        ?.lesson_date.slice(0, 10) +
                      ")"
                    : ""}</div>
                  
                </th>
                <th className="p-4 w-[calc(16%)] text-center">
                  {t("mainpage.friday") as string}
                  <div>
                    {schedules?.filter((item: any) => item.day_number == 5)[0]
                      ?.lesson_date
                      ? " (" +
                        schedules
                          ?.filter((item: any) => item.day_number == 5)[0]
                          ?.lesson_date.slice(0, 10) +
                        ")"
                      : ""}
                  </div>
                </th>
                <th className="p-4 rounded-tr-lg w-[calc(16%)] text-center">
                  {t("mainpage.saturday") as string}
                  <div>
                    {schedules?.filter((item: any) => item.day_number == 6)[0]
                      ?.lesson_date
                      ? " (" +
                        schedules
                          ?.filter((item: any) => item.day_number == 6)[0]
                          ?.lesson_date.slice(0, 10) +
                        ")"
                      : ""}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {Array.from(
                {
                  length: Math.max(
                    ...schedules.map((lesson: any) =>
                      Number(!isNaN(lesson?.pair_name) ? lesson.pair_name : 0)
                    )
                  ),
                },
                (_, index) => index + 1
              ).map((item: any, index: number) => {
                if (
                  schedules?.filter(
                    (subject: any) =>
                      Number(
                        !isNaN(subject?.pair_name) ? subject?.pair_name : 0
                      ) ==
                      index + 1
                  ).length <= 0
                )
                  return;

                let rowData = schedules?.filter(
                  (row: any) => row.pair_name == item
                );

                let indexCounter: number;
                return (
                  <tr
                    key={index}
                    className={`${
                      (index + 4) % 2 == 0
                        ? "bg-blue-100 dark:bg-orange-100"
                        : "bg-blue-200 dark:bg-orange-200"
                    } h-auto`}
                  >
                    <td className="py-4 text-black font-semibold h-10 w-[80px]">
                      <div className="transform -rotate-90 whitespace-nowrap lowercase">
                        {`${item}-${t("mainpage.pair") as string}`}
                      </div>
                    </td>
                    {rowData
                      ?.filter((subject: any, index: number) => {
                        if (index < 6) {
                          return subject;
                        }
                      })
                      ?.sort(
                        (a: any, b: any) =>
                          Number(a?.day_number) - Number(b?.day_number)
                      )
                      .map((subject: any, index: number) => {
                        if (index == 0) {
                          indexCounter = 1;
                        } else {
                          indexCounter += 1;
                        }

                        if (subject.day_number == indexCounter) {
                          return (
                            <td
                              className="border text-black text-sm"
                              key={index}
                            >
                              <div className="m-1.5 px-2 font-semibold">
                                {subject.lesson_time}
                              </div>
                              <div className="m-1.5 px-2 font-medium flex justify-between">
                                <div>{subject.training_type}</div>
                                <div className="flex gap-4">
                                  {subject.lesson_topic ? (
                                    <div
                                      className="hover:cursor-pointer"
                                      onClick={() =>
                                        handleShowTopic(
                                          subject.lesson_topic,
                                          subject.id
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faBookOpen}
                                        color="#14059c"
                                        size={"lg"}
                                      />
                                    </div>
                                  ) : undefined}
                                  {subject.lesson_topic_path ? (
                                    <a
                                      href={subject.lesson_topic_path}
                                      target="_blank"
                                    >
                                      <FontAwesomeIcon
                                        icon={faFilePdf}
                                        size={"lg"}
                                        color="#14059c"
                                      />
                                    </a>
                                  ) : undefined}
                                </div>
                              </div>
                              {!showTopic?.status ||
                              showTopic.id != subject.id ? (
                                <>
                                  <div className="m-1.5 px-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg h-12 w-auto flex items-center">
                                    <div className="line-clamp-2">
                                      {subject.subject_name}
                                    </div>
                                  </div>
                                  <div
                                    className="cursor-pointer m-1.5 px-2 py-0.5 bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-lg"
                                    onClick={() => handleTeacherClick(subject)}
                                  >
                                    {
                                      subject.employee_fio
                                        .split(/\s+/)[1]
                                        .split("")[0]
                                    }
                                    .
                                    {
                                      subject.employee_fio
                                        .split(/\s+/)[2]
                                        .split("")[0]
                                    }
                                    .{subject.employee_fio.split(/\s+/)[0]}
                                  </div>
                                  <div className="m-1.5 px-2 py-0.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg flex items-center">
                                    <div className="line-clamp-1">
                                      {subject.auditorium}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="p-2 m-2 bg-white rounded-lg font-semibold">
                                  <div className="line-clamp-5">
                                    {showTopic.topic}
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        } else {
                          let temp = Number(subject?.day_number) - indexCounter;
                          indexCounter = Number(subject.day_number);
                          return (
                            <>
                              {Array.from({ length: temp }, (v, i) => i).map(
                                (index: number) => (
                                  <td
                                    className="border text-black text-sm"
                                    key={index}
                                  ></td>
                                )
                              )}
                              <td
                                className="border text-black text-sm"
                                key={index}
                              >
                                <div className="m-1.5 px-2 font-semibold">
                                  {subject.lesson_time}
                                </div>
                                <div className="m-1.5 px-2 font-medium flex justify-between">
                                  <div>{subject.training_type}</div>
                                  <div className="flex gap-4">
                                    {subject.lesson_topic ? (
                                      <div
                                        className="hover:cursor-pointer"
                                        onClick={() =>
                                          handleShowTopic(
                                            subject.lesson_topic,
                                            subject.id
                                          )
                                        }
                                      >
                                        <FontAwesomeIcon
                                          icon={faBookOpen}
                                          color="#14059c"
                                          size={"lg"}
                                        />
                                      </div>
                                    ) : undefined}
                                    {subject.lesson_topic_path ? (
                                      <a
                                        href={subject.lesson_topic_path}
                                        target="_blank"
                                      >
                                        <FontAwesomeIcon
                                          icon={faFilePdf}
                                          size={"lg"}
                                          color="#14059c"
                                        />
                                      </a>
                                    ) : undefined}
                                  </div>
                                </div>
                                {!showTopic?.status ||
                                showTopic.id != subject.id ? (
                                  <>
                                    <div className="m-1.5 px-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg h-12 flex items-center">
                                      <div className="line-clamp-2">
                                        {subject.subject_name}
                                      </div>
                                    </div>
                                    <div
                                      className="cursor-pointer m-1.5 px-2 py-0.5 bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-lg"
                                      onClick={() =>
                                        handleTeacherClick(subject.employee_id)
                                      }
                                    >
                                      {
                                        subject.employee_fio
                                          .split(/\s+/)[1]
                                          .split("")[0]
                                      }
                                      .
                                      {
                                        subject.employee_fio
                                          .split(/\s+/)[2]
                                          .split("")[0]
                                      }
                                      .{subject.employee_fio.split(/\s+/)[0]}
                                    </div>
                                    <div className="m-1.5 px-2 py-0.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg flex items-center">
                                      <div className="line-clamp-1">
                                        {subject.auditorium}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="p-2 m-2 bg-white rounded-lg font-semibold">
                                    <div className="line-clamp-5">
                                      {showTopic.topic}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </>
                          );
                        }
                      })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-16 w-full text-center font-semibold text-lg">
            <div>{t("mainpage.no_scheduled_lessons")}</div>
            <div className="w-full flex items-center justify-center mt-10">
              {theme !== "dark" ? (
                <img src="./assets/logogray.png" width={350} />
              ) : (
                <img src="./assets/logopng.png" width={350} />
              )}
            </div>
          </div>
        )}
      </div>
      <TeacherDetailsSchedule
        teachersHemisId={teacherId}
        showDrawer={showTeacherProfile}
        setShowDrawer={setShowTeacherProfile}
        showAssessment={showAssessment}
        setShowAssessment={setShowAssessment}
      />
      <TeacherAssessment
        subject={content ? content : null}
        showAssessment={showAssessment}
        setShowAssessment={setShowAssessment}
      />
      <Toaster />
    </div>
  );
}
