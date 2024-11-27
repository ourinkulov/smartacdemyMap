import axiosInstance from "./AxiosInstance";

export const getUniversityStatistics = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/hemis/university-statistic-info",
      {
        params: {
          educationTypeId: 11,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// students by province distribution
export const getStudentsByProvince = async (): Promise<any> => {
  try {
    const response = axiosInstance.get("/hemis/students-count-by-province", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// students by average grade by province
export const getAverageByProvince = async (
  semester_id: number,
  education_type_id: number
): Promise<any> => {
  try {
    const response = axiosInstance.get(
      "/hemis/students-avg-grade-by-province",
      {
        params: {
          semester_id: semester_id,
          education_type_id: education_type_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// teachers from staff
export const getStaff = async (
  currentPage: number,
  size: number,
  descending: boolean,
  id: string,
  teacher_id: number
): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/teacher", {
      params: {
        currPage: currentPage,
        size: size,
        descending: descending,
        order_by_: id,
        id: teacher_id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching teacher-info:", error);
  }
};

export const getStaffList = async (
  currentPage: number,
  size: number,
  descending: boolean,
  id: string,
  gender: number,
  degreeType: number,
  titleType: number,
  is_list_user: number
): Promise<any> => {
  try {
    const params = {
      currPage: currentPage,
      size: size,
      descending: descending,
      order_by_: id,
      gender: gender,
      academic_degree: degreeType,
      academic_rank: titleType,
      is_list_user: is_list_user
    };

    const filteredParams = filterParams(params);

    const response = await axiosInstance.get("/hemis/teacher", {
      params: filteredParams
    });
    return response;
  } catch (error) {
    console.error("Error fetching staff-statistic-info:", error);
  }
};

export const getTeachersStatistic = async (
  department_id: number = -1
): Promise<any> => {
  try {
    const params = {
      department_id: department_id
    };

    const filteredParams = filterParams(params);

    const response = await axiosInstance.get(
      "/hemis/get-teacher-statistic",
      {
        params: filteredParams
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching teacher-statistic-info:", error);
  }
};

// teachers from staff
export const getTeachersByDepartament = async (
  department_id: number = 10,
  descending: boolean,
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/hemis/teachers-list-by-department",
      {
        params: {
          department_id: department_id,
          descending: descending,
          order_by_: id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// teachers from staff
export const getStatisticByDepartment = async (
  department_id: number = 10,
  descending: boolean,
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/hemis/get-statistic-by-department",
      {
        params: {
          department_id: department_id,
          descending: descending,
          order_by_: id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

export const getStaffSmart = async (
  currentPage: number = 1,
  size: number,
  descending: boolean,
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get("/smart-rating/staffs", {
      params: {
        currPage: currentPage,
        size: size,
        descending: descending,
        order_by_: id
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// semesters
export const getSemesters = async (educationTypeId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/semester", {
      params: {
        education_type_id: educationTypeId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};
// students
export const getStudents = async (
  currentPage: number,
  size: number,
  descending: boolean,
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/students", {
      params: {
        currPage: currentPage,
        size: size,
        descending: descending,
        order_by_: id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// top-students
export const getTopStudents = async (education_form_id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/top-students", {
      params: {
        education_form_id: education_form_id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// group of students list
export const getStudentsGroup = async (
  department_id: number,
  specialty_id: number,
  group_id: number,
  education_type_id: number,
  education_form_id: number
): Promise<any> => {
  try {
    const params = {
      department_id: department_id,
      specialty_id: specialty_id,
      group_id: group_id,
      education_type_id: education_type_id,
      education_form_id: education_form_id
    };

    const filteredParams = filterParams(params);
    const response = await axiosInstance.get("/hemis/student-grade-by-group", {
      params: filteredParams
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// group of students list
export const getStudentsGroupStat = async (group_id: number, education_type_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/hemis/group-statistic-by-education",
      {
        params: {
          group_id: group_id,
          education_type_id: education_type_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//student's performance
export const getStudentsPerformance = async (
  students_id: number,
  semesterId: number,
  education_type_id: number,
  education_form_id: number
): Promise<any> => {
  try {
    const params = {
      students_id: students_id,
      semester_id: semesterId,
      education_type_id: education_type_id,
      education_form_id: education_form_id
    };

    const filteredParams = filterParams(params);
    const response = await axiosInstance.get("/hemis/student-avg-grade", {
      params: filteredParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//student's discipline
export const getStudentsDiscipline = async (
  students_id: number
): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/hemis/student-disciplinary-metrics",
      {
        params: {
          students_id: students_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//student's rating degree
export const getStudentsRatingDegree = async (
  students_id: number,
  education_type_id: number,
  education_form_id: number
): Promise<any> => {
  try {
    const params = {
      student_id: students_id,
      education_type_id: education_type_id,
      education_form_id: education_form_id
    };

    const filteredParams = filterParams(params);
    const response = await axiosInstance.get("/hemis/student-rating-degree", {
      params: filteredParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//student's grade by semester
export const getStudentsAvgGradeBySemester = async (
  students_id: number, education_type_id: number, education_form_id: number
): Promise<any> => {
  try {
    const params = {
      student_id: students_id,
      education_type_id: education_type_id,
      education_form_id: education_form_id
    };

    const filteredParams = filterParams(params);
    const response = await axiosInstance.get(
      "/hemis/student-avg-grade-by-semester",
      {
        params: filteredParams
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//student's image
export const getStudentsImage = async (students_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/student-img", {
      params: {
        student_id: students_id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// activities
export const getActivities = async (
  education_type_id: number
): Promise<any> => {
  try {
    const response = axiosInstance.get(
      "/hemis/class-activities-by-percentage",
      {
        params: {
          education_type_id: education_type_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// faculties
export const getFaculties = async (): Promise<any> => {
  try {
    const response = axiosInstance.get("/hemis/faculties", {
      params: {
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// chairs
export const getChairs = async (): Promise<any> => {
  try {
    const response = axiosInstance.get("/hemis/chairs", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// groups
export const getGroups = async (department_id: number, specialty_id: number): Promise<any> => {
  try {
    const params = {
      department_id: department_id,
      specialty_id: specialty_id
    };

    const filteredParams = filterParams(params);
    const response = axiosInstance.get("/hemis/groups", {
      params: filteredParams
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// subjects
export const getSubjects = async (): Promise<any> => {
  try {
    const response = axiosInstance.get("/hemis/subjects", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// chairs info to orgtree
export const getSmartChairsInfo = async (order_by: string): Promise<any> => {
  try {
    const params = {
      order_by_: order_by,
    };

    const filteredParams = filterParams(params);
    const response = axiosInstance.get("/smart-rating/chairs-info", {
      params: filteredParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

// chairs info to orgtree
export const getSmartManagers = async (): Promise<any> => {
  try {
    const response = axiosInstance.get("/smart-rating/managers-structure", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching org-structure:", error);
  }
};

//bachelor's course-of-study (yo'nalish)
export const coursesOfStudy = async (educationTypeId: number, educationFormId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/course-of-study", {
      params: {
        education_type_id: educationTypeId,
        education_form_id: educationFormId
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//professors rating by department
export const smartRatingByDepartment = async (
  department_id: number
): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/smart-rating/get-chair-common-info",
      {
        params: {
          department_id: department_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//professors rating by department
export const smartRatingProfessor = async (users_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/smart-rating/get-staff-common-info",
      {
        params: {
          users_id: users_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

//bachelor's types-of-training (yo'nalish)
export const typesOfTraining = async (
  department_id: number,
  semester_id: number,
  specialty_id: number,
  educationTypeId: number
): Promise<any> => {
  try {
    const params = {
      department_id: department_id,
      semester_id: semester_id,
      specialty_id: specialty_id,
      education_type_id: educationTypeId,
    };

    const filteredParams = filterParams(params);
    const response = await axiosInstance.get("/hemis/types-of-training", {
      params: filteredParams
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// department groups (guruh)
export const depGroups = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/dep-groups", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// department managements (boshqarma)
export const depManagements = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/dep-managements", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// department services (xizmatlar)
export const depServices = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/dep-services", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// departments bo'limlar
export const departs = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/departments", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// master yo'nalishlar
export const getSpecialities = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/e-speciality", {
      params: {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// schedule
export const schedule = async (
  groupId: any,
  lesson_date: any,
  education_type_id: number
): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis/student-lesson-schedule", {
      params: {
        group_id: groupId,
        lesson_date: lesson_date,
        education_type_id: education_type_id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching uni-statistic-info:", error);
  }
};

// test center import
export const getPerformance = async (
  currPage: number = 1,
  size: number = 20,
  descending: boolean = false,
  order_by_: string = "id",
  education_type_id: number,
  exam_type: any,
  group_id: number,
  semester_id: number,
  subject_id: number
): Promise<any> => {
  try {
    const params = {
      currPage: currPage,
      size: size,
      descending: descending,
      order_by_: order_by_,
      education_type_id: education_type_id,
      exam_type: exam_type,
      group_id: group_id,
      semester_id: semester_id,
      subject_id: subject_id
    };

    const filteredParams = filterParams(params);
    const response = await axiosInstance.get("/hemis/e-performance", {
      params: filteredParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const getExamTypes = async (
  currPage: number = 1,
  size: number = 20,
  descending: boolean = false,
  order_by_: string = "id"
): Promise<any> => {
  try {
    const response = await axiosInstance.get("/hemis", {
      params: {
        currPage: currPage,
        size: size,
        descending: descending,
        order_by_: order_by_,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const fileUpload = async (
  // resourceTypeId: number = 2,
  files: any
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/file/upload?resourceTypeId=2`,
      files,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: files,
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const testformSend = async (resourceId: number): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/hemis/import-exam-performance?resources_id=${resourceId}`,
      {}
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

// science potential dynamics - charts
export const getScienceDynamics = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/smart-rating/science-dynamics`,
      {}
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

// e-doc - data
export const getDocData = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/e-doc/doc-cnt`,
      {}
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const getDocType = async (from_date: string, to_date: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/e-doc/doc-type`,
      {
        params: {
          from_date: from_date,
          to_date: to_date
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const getDocTypePie = async (from_date: string, to_date: string, incomingDoctype: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/e-doc/doc-type-pie`,
      {
        params: {
          from_date: from_date,
          to_date: to_date,
          kiruvchi_hujjat_turi: incomingDoctype
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const getDocByDepartment = async (from_date: string, to_date: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/e-doc/doc-by-department`,
      {
        params: {
          from_date: from_date,
          to_date: to_date
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const getDocBestEmp = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/e-doc/doc-by-best-emp`,
      {

      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const getDocWeakEmp = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/e-doc/doc-by-late-emp`,
      {

      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

// teacher evaluation
export const getTeacherRating = async (currentPage: number,
  size: number,
  descending: boolean,
  id: string,
  teacher_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/hemis/e-valuation-teacher`,
      {
        params: {
          currPage: currentPage,
          size: size,
          descending: descending,
          order_by_: id,
          teacher_id: teacher_id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching performance-info:", error);
  }
};

export const setTeacherRating = async (e_subject_schedule_id: number, e_student_id: number, mark: number, comment: string, evaluatorId: number): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/hemis/insert-evaluation-teacher`, null,
      {
        params: {
          e_subject_schedule_id: e_subject_schedule_id,
          e_student_id: e_student_id,
          mark: mark,
          comment: comment,
          dash_users_id: evaluatorId
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching evaluation-teacher:", error);
  }
};

//doctorate
export const getResearchPeriods = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/smart-rating/acceptends`,
      {}
    );
    return response;
  } catch (error) {
    console.error("Error fetching periods-info:", error);
  }
};

export const getResearchers = async (period_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/smart-rating/researcher`, null,
      {
        params: {
          acceptend_id: period_id
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching researchers:", error);
  }
};

export const getResearcherDetails = async (researcher_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/smart-rating/researcher-info`,
      {
        params: {
          user_id: researcher_id
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching researcher-info:", error);
  }
};

export const getResearcherPlan = async (researcher_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/smart-rating/work-plans`,
      {
        params: {
          user_id: researcher_id
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching work-plan:", error);
  }
};

export const getAcceptedCount = async (period_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/smart-rating/accepted-doctorate`,
      {
        params: {
          acceptend_id: period_id
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching researchers:", error);
  }
};

export const getResearchResults = async (period_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/smart-rating/research-result",
      {
        params: {
          acceptend_id: period_id
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching researchers:", error);
  }
};

export const getWorkPlan = async (user_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      "/smart-rating/plan-pdf-url",
      {
        params: {
          user_id: user_id
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching researchers:", error);
  }
};

//filter
function filterParams(params: any) {
  return Object.keys(params)
    .filter((key) => params[key] !== null && params[key] !== undefined && params[key] !== -1)
    .reduce((filtered: any, key) => {
      filtered[key] = params[key];
      return filtered;
    }, {});
}
