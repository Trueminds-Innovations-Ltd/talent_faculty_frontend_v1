import type { Member, Project } from "../types/types";

export const CURRENT_USER_ID = "u1"; // swap with your auth user id

const av = (n: number) => `https://i.pravatar.cc/80?img=${n}`;

export const members: Member[] = [
  { id: "u1", name: "Rita Okoro", role: "UI/UX Designer", avatar: av(47), isLead: true },
  { id: "u2", name: "Michael James", role: "UI/UX Designer", avatar: av(12) },
  { id: "u3", name: "Sarah Ade", role: "Frontend Developer", avatar: av(45) },
  { id: "u4", name: "Ada Obi", role: "Backend Developer", avatar: av(44) },
  { id: "u5", name: "Ike Amaka", role: "Graphic Designer", avatar: av(15) },
];

export const projects: Project[] = [
  {
    id: "fintech-mobile",
    title: "FinTech Mobile Experience",
    track: "UI/UX Design",
    cohort: "Cohort 4",
    brief: "Design a mobile banking experience that makes everyday financial management simple and accessible for young adults.",
    objectives: [
      "Understand the target user's needs",
      "Define the core user journey",
      "Create the key product screens",
      "Develop a clickable prototype",
      "Present the final solution",
    ],
    deadline: "2026-10-12",
    progress: 25,
    currentPhase: 1,
    phases: [
      { label: "Research", range: "Aug 25 - Sep 5", icon: "research" },
      { label: "Ideation", range: "Sep 6 - Sep 12", icon: "ideation" },
      { label: "Design", range: "Sep 13 - Sep 30", icon: "design" },
      { label: "Prototype", range: "Oct 1 - Oct 7", icon: "prototype" },
      { label: "Presentation", range: "Oct 8 - Oct 12", icon: "presentation" },
    ],
    members,
    tasks: [
      { id: "t1", title: "User Research", description: "Conduct user interviews and surveys", assignedTo: "u1", dueDate: "2026-09-20", status: "Completed" },
      { id: "t2", title: "User Flow", description: "Create user flow for core journey", assignedTo: "u2", dueDate: "2026-09-23", status: "In Progress" },
      { id: "t3", title: "Wireframes", description: "Low fidelity wireframe for key screens", assignedTo: "u5", dueDate: "2026-09-27", status: "Pending" },
      { id: "t4", title: "UI Design", description: "High fidelity design for all screens", assignedTo: "u3", dueDate: "2026-10-02", status: "In Progress" },
      { id: "t5", title: "Prototype", description: "Interactive prototype in Figma", assignedTo: "u4", dueDate: "2026-10-07", status: "Pending" },
      { id: "t6", title: "Presentation", description: "Final presentation and documentation", assignedTo: "team", dueDate: "2026-10-12", status: "Pending" },
    ],
    files: [
      { id: "f1", name: "User Research Report.pdf", category: "Documents", uploadedBy: "u1", uploadedAt: "2026-09-10T14:30:00", size: "2.2 MB" },
      { id: "f2", name: "User Flow.fig", category: "Design", uploadedBy: "u2", uploadedAt: "2026-09-10T14:30:00", size: "2.2 MB" },
      { id: "f3", name: "Wireframes.fig", category: "Design", uploadedBy: "u5", uploadedAt: "2026-09-10T14:30:00", size: "2.2 MB" },
      { id: "f4", name: "FinTech Style Guide.pdf", category: "Documents", uploadedBy: "u3", uploadedAt: "2026-09-10T14:30:00", size: "2.2 MB" },
      { id: "f5", name: "Prototype.link", category: "Others", uploadedBy: "u4", uploadedAt: "2026-09-10T14:30:00", size: "2.2 MB" },
    ],
    comments: [
      { id: "c1", authorId: "u1", createdAt: "2026-09-21T11:30:00", text: "Should we use the second user flow for the final prototype?", replies: 2, likes: 2 },
    ],
  },
  {
    id: "landing-page",
    title: "Talent Faculty Landing Page",
    track: "Product Design",
    cohort: "Cohort 4",
    brief: "Design a landing page that explains the Talent Faculty programme and converts visitors into applicants.",
    objectives: ["Understand the audience", "Define the page structure", "Design the key sections", "Present the final solution"],
    deadline: "2026-10-25",
    progress: 25,
    currentPhase: 0,
    phases: [
      { label: "Research", range: "Sep 1 - Sep 10", icon: "research" },
      { label: "Ideation", range: "Sep 11 - Sep 18", icon: "ideation" },
      { label: "Design", range: "Sep 19 - Oct 12", icon: "design" },
      { label: "Prototype", range: "Oct 13 - Oct 20", icon: "prototype" },
      { label: "Presentation", range: "Oct 21 - Oct 25", icon: "presentation" },
    ],
    members,
    tasks: [],
    files: [],
    comments: [],
  },
];

export const getProject = (id?: string) => projects.find((p) => p.id === id);

// Replace with a real API call.
export async function submitProject(id: string, _payload: { link: string; file: File; reflection: string }) {
  const p = getProject(id);
  if (p) p.submittedAt = new Date().toISOString();
}
