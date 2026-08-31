import type {
  Assessment,
  CertificateRow,
  Cohort,
  CohortCourse,
  Learner,
} from "../types/cohort";



export const coordinators = {
  ogundele: {
    name: "Ogundele Isaac",
    email: "ogund@trueminds.com",
    initials: "OI",
  },
};

export const instructorsDirectory = {
  matthew: { name: "Matthew Coker", email: ".mattc@trueminds.com", initials: "MC" },
  ngozi: { name: "Ngozi Favour", email: ".ngozif@trueminds.com", initials: "NF" },
  john: { name: "John Akike", email: ".johna@trueminds.com", initials: "JA" },
};



export const cohorts: Cohort[] = [
  {
    id: "TF01-01-A",
    name: "Cohort 1 Batch A (Genesis)",
    code: "TF01-01-A",
    alias: "Genesis",
    description: "Trueminds first set of Interns",
    programType: "Internship",
    coordinator: coordinators.ogundele,
    instructors: [instructorsDirectory.matthew, instructorsDirectory.ngozi, instructorsDirectory.john],
    initials: "GA",
    status: "Completed",
    enrolled: "200",
    courses: "10",
    start: "2/3/26",
    end: "2/6/26",
    allowSelfEnrollment: false,
    requireEnrollmentApproval: false,
    sendWelcomeEmail: true,
    visibleToAllLearners: true,
  },
  {
    id: "TF01-02-B",
    name: "Cohort 1 Batch B (Alpha)",
    code: "TF01-02-B",
    alias: "Alpha",
    description: "Trueminds first bootcamp batch",
    programType: "Bootcamp",
    coordinator: coordinators.ogundele,
    instructors: [instructorsDirectory.matthew],
    initials: "AB",
    status: "Completed",
    enrolled: "245",
    courses: "10",
    start: "2/3/26",
    end: "2/6/26",
    allowSelfEnrollment: false,
    requireEnrollmentApproval: false,
    sendWelcomeEmail: true,
    visibleToAllLearners: true,
  },
  {
    id: "TF02-01-A",
    name: "Cohort 2 Batch A (Gemini)",
    code: "TF02-01-A",
    alias: "Gemini",
    description: "Professional training track",
    programType: "Professional Training",
    coordinator: coordinators.ogundele,
    instructors: [instructorsDirectory.ngozi],
    initials: "GA",
    status: "Active",
    enrolled: "102",
    courses: "14",
    start: "2/6/26",
    end: "2/9/26",
    allowSelfEnrollment: false,
    requireEnrollmentApproval: false,
    sendWelcomeEmail: true,
    visibleToAllLearners: true,
  },
  {
    id: "TF02-02-B",
    name: "Cohort 2 Batch B (Beta)",
    code: "TF02-02-B",
    alias: "Beta",
    description: "Certification programme batch",
    programType: "Certification Programe",
    coordinator: coordinators.ogundele,
    instructors: [instructorsDirectory.john],
    initials: "BB",
    status: "Active",
    enrolled: "100",
    courses: "14",
    start: "2/6/26",
    end: "2/9/26",
    allowSelfEnrollment: false,
    requireEnrollmentApproval: false,
    sendWelcomeEmail: true,
    visibleToAllLearners: true,
  },
  {
    id: "TF03-03-A",
    name: "Cohort 3 Batch A (Origin)",
    code: "TF03-03-A",
    alias: "Origin",
    description: "Masterclass cohort",
    programType: "Masterclass",
    coordinator: coordinators.ogundele,
    instructors: [instructorsDirectory.matthew, instructorsDirectory.ngozi],
    initials: "OA",
    status: "Active",
    enrolled: "465",
    courses: "10",
    start: "2/6/26",
    end: "2/9/26",
    allowSelfEnrollment: false,
    requireEnrollmentApproval: false,
    sendWelcomeEmail: true,
    visibleToAllLearners: true,
  },
  {
    id: "TF03-03-B",
    name: "Cohort 3 Batch B (Gamma)",
    code: "TF03-03-B",
    alias: "Gamma",
    description: "Short course cohort",
    programType: "Short Course",
    coordinator: coordinators.ogundele,
    instructors: [instructorsDirectory.john],
    initials: "GB",
    status: "Upcoming",
    enrolled: "-",
    courses: "-",
    start: "2/10/26",
    end: "2/01/27",
    allowSelfEnrollment: false,
    requireEnrollmentApproval: false,
    sendWelcomeEmail: true,
    visibleToAllLearners: true,
  },
];

export const managedCohortIds = ["TF01-01-A", "TF03-03-A", "TF03-03-B"];

export const cohortOverviewStats = {
  totalCohorts: { value: 20, delta: "+10 this month", caption: "All cohort" },
  activeCohorts: { value: 2, delta: "+1 this month", caption: "Currently running" },
  upcomingCohorts: { value: 2, delta: "+2 this month", caption: "Starting soon" },
  completedCohorts: { value: 5, delta: "+1 this month", caption: "Successfully completed" },
};


export const learnerOverview = {
  overallProgress: 87,
  totalLearners: 200,
  activeLearners: 134,
  completed: 60,
  inactive: 6,
};

export const learners: Learner[] = [
  { name: "Kenneth Michael", email: "kend@gmail.com", initials: "KM", coursesEnrolled: "4/4", courseCompletion: 100, assessmentCompletion: 100, cohortProgress: 100, status: "Completed" },
  { name: "Ikediri Linus", email: "iiked@gmail.com", initials: "IL", coursesEnrolled: "4/4", courseCompletion: 90, assessmentCompletion: 96, cohortProgress: 100, status: "Completed" },
  { name: "Musa Muhammed", email: "musa@gmail.com", initials: "MM", coursesEnrolled: "4/4", courseCompletion: 84, assessmentCompletion: 90, cohortProgress: 75, status: "Active" },
  { name: "Ikediri Linus", email: "iiked@gmail.com", initials: "IL", coursesEnrolled: "4/4", courseCompletion: 75, assessmentCompletion: 60, cohortProgress: 70, status: "Active" },
  { name: "Ikediri Linus", email: "iiked@gmail.com", initials: "IL", coursesEnrolled: "0/4", courseCompletion: 0, assessmentCompletion: 0, cohortProgress: 0, status: "Inactive" },
];


export const courseOverview = {
  avgCompletion: 47,
  assignedCourses: 4,
  completedCourses: 1,
  inProgress: 2,
  notStarted: 1,
};

export const cohortCourses: CohortCourse[] = [
  { name: "Graphic Design Bssics", initials: "GD", lessonsModules: "25 Lessons  40 Modules", instructor: "Matthew Coker", status: "Completed", enrollees: "194/200", certificatesIssued: "124/200", courseCompletion: 98, assessmentCompletion: 96 },
  { name: "Introduction to  Product..", initials: "PD", lessonsModules: "40 Lessons 34 Modules", instructor: "Matthew Coker", status: "In Progress", enrollees: "190/200", certificatesIssued: "45/200", courseCompletion: 90, assessmentCompletion: 96 },
  { name: "Machine Learning", initials: "ML", lessonsModules: "25 Lessons 45 Modules", instructor: "Ngozi Favour", status: "In Progress", enrollees: "145/200", certificatesIssued: "56/200", courseCompletion: 84, assessmentCompletion: 90 },
  { name: "Introduction to  Python D.", initials: "PY", lessonsModules: "40 Lessons 23 Modules", instructor: "John Akike", status: "Not Started", enrollees: "0/200", certificatesIssued: "0/200", courseCompletion: 0, assessmentCompletion: 0 },
];



export const assessmentOverview = {
  avgCompletion: 47,
  totalAssessments: 89,
  avgPass: 67,
  avgScore: 78,
};

export const assessments: Assessment[] = [
  { name: "Design Essentials", type: "Assignment", courseInitials: "GD", course: "Graphic Design Bssics", courseDetail: "25 Lessons  40 Modules", passRate: 65, averageScore: 67, completion: 56 },
  { name: "Wireframe Challenge", type: "Quiz", courseInitials: "PD", course: "Introduction to  Product..", courseDetail: "40 Lessons 34 Modules", passRate: 87, averageScore: 90, completion: 96 },
  { name: "AI ethics", type: "Project", courseInitials: "ML", course: "Machine Learning", courseDetail: "25 Lessons 45 Modules", passRate: 77, averageScore: 84, completion: 90 },
  { name: "Python variables", type: "Quiz", courseInitials: "PY", course: "Introduction to  Python D.", courseDetail: "40 Lessons 23 Modules", passRate: 56, averageScore: 45, completion: 67 },
  { name: "Python variables", type: "Quiz", courseInitials: "PY", course: "Introduction to  Python D.", courseDetail: "40 Lessons 23 Modules", passRate: 56, averageScore: 78, completion: 67 },
];


export const certificateOverview = {
  completionRate: 75,
  certificates: 4,
  issued: 2,
  pending: 2,
  ineligible: 0,
};

export const certificateRows: CertificateRow[] = [
  { name: "Certification in Graphic Design Basics", initials: "GD", instructor: "Matthew Coker", status: "Completed", certificatesIssued: "124/200", courseCompletion: 100, issuedDate: "20/06/26" },
  { name: "Diploma in Product Design", initials: "PD", instructor: "Matthew Coker", status: "Completed", certificatesIssued: "45/200", courseCompletion: 100, issuedDate: "12/07/26" },
  { name: "Certificate  of Completion in Machine Learning", initials: "ML", instructor: "Ngozi Favour", status: "In Progress", certificatesIssued: "56/200", courseCompletion: 84, issuedDate: "-" },
  { name: "Certification in Python Development", initials: "PY", instructor: "John Akike", status: "In Progress", certificatesIssued: "0/200", courseCompletion: 23, issuedDate: "-" },
];

export function getCohortById(id: string | undefined): Cohort | undefined {
  return cohorts.find((c) => c.id === id);
}


export const courseDirectory = [
  { id: "c1", label: "Introduction to Product D.", sublabel: "45 Lessons" },
  { id: "c2", label: "Introduction to Python D.", sublabel: "45 Lessons" },
  { id: "c3", label: "Graphic Design Basics", sublabel: "25 Lessons" },
  { id: "c4", label: "Machine Learning Basics", sublabel: "25 Lessons" },
  { id: "c5", label: "UI/UX Fundamentals", sublabel: "25 Lessons" },
];

export const coordinatorDirectory = [
  { id: "p1", label: "Ogundele Isaac", sublabel: "ogund@trueminds.com" },
];

export const instructorDirectoryOptions = [
  { id: "p2", label: "Matthew Coker", sublabel: ".mattc@trueminds.com" },
  { id: "p3", label: "Ngozi Favour", sublabel: ".ngozif@trueminds.com" },
  { id: "p4", label: "John Akike", sublabel: ".johna@trueminds.com" },
  { id: "p5", label: "Aduname Elizabeth", sublabel: ".mattc@trueminds.com" },
];

export const learnerDirectory = [
  { id: "l1", label: "Gift Monday", sublabel: "giftm@gmail.com" },
  { id: "l2", label: "Ekundayo Tolu", sublabel: "ekundagmail.com" },
  { id: "l3", label: "Ifeoma Adaeze", sublabel: "ifeada@gmail.com" },
];

export const programTypeOptions = [
  "Internship",
  "Bootcamp",
  "Professional Training",
  "Certification Programe",
  "Masterclass",
  "Short Course",
];
