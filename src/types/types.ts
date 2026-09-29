export type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isLead?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string | "team"; // member id or the whole team
  dueDate: string; // ISO
  status: TaskStatus;
}

export interface ProjectFile {
  id: string;
  name: string;
  category: "Documents" | "Design" | "Others";
  uploadedBy: string;
  uploadedAt: string; // ISO
  size: string;
}

export interface Comment {
  id: string;
  authorId: string;
  createdAt: string; // ISO
  text: string;
  replies: number;
  likes: number;
  liked?: boolean;
}

export interface Phase {
  label: string;
  range: string;
  icon: "research" | "ideation" | "design" | "prototype" | "presentation";
}

export interface Project {
  id: string;
  title: string;
  track: string;
  cohort: string;
  brief: string;
  objectives: string[];
  deadline: string; // ISO
  progress: number; // 0-100
  currentPhase: number; // index into phases; phases <= index are "done"
  phases: Phase[];
  members: Member[];
  tasks: Task[];
  files: ProjectFile[];
  comments: Comment[];
  submittedAt?: string;
  feedback?: string;
}
