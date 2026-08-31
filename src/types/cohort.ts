export type CohortStatus = "Completed" | "Active" | "Upcoming";

export type LearnerStatus = "Completed" | "Active" | "Inactive";

export type AssignmentStatus = "Completed" | "In Progress" | "Not Started";

export interface Person {
  name: string;
  email: string;
  image?: string;
  initials: string;
}

export interface Cohort {
  id: string;
  name: string;
  code: string;
  alias: string;
  description: string;
  programType: string;
  coordinator: Person;
  instructors: Person[];
  image?: string;
  initials: string;
  status: CohortStatus;
  enrolled: string;
  courses: string;
  start: string;
  end: string;
  capacity?: number;
  allowSelfEnrollment: boolean;
  requireEnrollmentApproval: boolean;
  sendWelcomeEmail: boolean;
  visibleToAllLearners: boolean;
}

export interface Learner {
  name: string;
  email: string;
  image?: string;
  initials: string;
  coursesEnrolled: string;
  courseCompletion: number;
  assessmentCompletion: number;
  cohortProgress: number;
  status: LearnerStatus;
}

export interface CohortCourse {
  name: string;
  image?: string;
  initials: string;
  lessonsModules: string;
  instructor: string;
  status: AssignmentStatus;
  enrollees: string;
  certificatesIssued: string;
  courseCompletion: number;
  assessmentCompletion: number;
}

export interface Assessment {
  name: string;
  type: "Assignment" | "Quiz" | "Project";
  courseImage?: string;
  courseInitials: string;
  course: string;
  courseDetail: string;
  passRate: number;
  averageScore: number;
  completion: number;
}

export interface CertificateRow {
  name: string;
  image?: string;
  initials: string;
  instructor: string;
  status: AssignmentStatus;
  certificatesIssued: string;
  courseCompletion: number;
  issuedDate: string;
}
