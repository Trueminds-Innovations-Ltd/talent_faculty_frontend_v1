export type LearnerStatus = 'On Track' | 'Completed' | 'Not Started' | 'At Risk'

export interface LearnerListItem {
  id: string
  name: string
  email: string
  avatar: string
  module: string
  grade: number | null
  progress: number
  lastActivity: string
  status: LearnerStatus
}

export interface RecentActivity {
  activity: string
  module: string
  date: string
  status: string
}

export interface CourseProgress {
  course: string
  progress: number
  lessons: string
  grade: string
  status: string
}

export interface AssignmentRecord {
  assignment: string
  module: string
  dueDate: string
  score: string
  status: string
}

export interface QuizRecord {
  quiz: string
  module: string
  attempts: number
  score: string
  status: string
}

export interface LearnerProfile {
  track: string
  lastActiveLabel: string
  overallProgress: number
  averageScore: number
  lessonsCompleted: string
  assignmentsCompleted: string
  recentActivities: RecentActivity[]
  courses: CourseProgress[]
  assignments: AssignmentRecord[]
  quizzes: QuizRecord[]
}

const avatars = ['/avartar.png', '/avartar (1).png', '/avartar (2).png', '/avartar (3).png', '/avartar (4).png']

export const learners: LearnerListItem[] = [
  {
    id: 'blake-nguyen',
    name: 'Blake Nguyen',
    email: 'blake.nguyen0@school.edu',
    avatar: avatars[0],
    module: 'UX Research Fundamentals',
    grade: 54,
    progress: 58,
    lastActivity: 'Submitted Assignment · 2h ago',
    status: 'On Track',
  },
  {
    id: 'morgan-diaz',
    name: 'Morgan Diaz',
    email: 'morgan.diaz1@school.edu',
    avatar: avatars[1],
    module: 'Design Thinking Essentials',
    grade: 100,
    progress: 100,
    lastActivity: 'Completed Course · Yesterday',
    status: 'Completed',
  },
  {
    id: 'juno-silva',
    name: 'Juno Silva',
    email: 'junosilva9@school.edu',
    avatar: avatars[2],
    module: 'User Research & Discovery',
    grade: 0,
    progress: 0,
    lastActivity: 'Assigned · 5h ago',
    status: 'Not Started',
  },
  {
    id: 'bilal-patel',
    name: 'Bilal Patel',
    email: 'bilal.patel23@school.edu',
    avatar: avatars[3],
    module: 'Wireframing Fundamentals',
    grade: 0,
    progress: 0,
    lastActivity: 'Assigned · 10 minutes ago',
    status: 'Not Started',
  },
  {
    id: 'kai-rivera',
    name: 'Kai Rivera',
    email: 'kai.rivera20@school.edu',
    avatar: avatars[0],
    module: 'Information Architecture',
    grade: 51,
    progress: 48,
    lastActivity: 'Submitted Assignment · 10 minutes ago',
    status: 'On Track',
  },
  {
    id: 'farid-okafor',
    name: 'Farid Okafor',
    email: 'farid.okafor1759@school.edu',
    avatar: avatars[1],
    module: 'UX Writing',
    grade: 30,
    progress: 5,
    lastActivity: 'Missed Assignment',
    status: 'At Risk',
  },
  {
    id: 'elena-ford',
    name: 'Elena Ford',
    email: 'elena.ford3228@school.edu',
    avatar: avatars[2],
    module: 'Usability Testing',
    grade: 77,
    progress: 78,
    lastActivity: 'Finished a Quiz · 10 minutes ago',
    status: 'On Track',
  },
  {
    id: 'aisha-andersson',
    name: 'Aisha Andersson',
    email: 'aisha.andersson40@school.edu',
    avatar: avatars[3],
    module: 'User Research & Discovery',
    grade: 40,
    progress: 0,
    lastActivity: 'Missed quizzes',
    status: 'At Risk',
  },
  {
    id: 'zion-chen',
    name: 'Zion Chen',
    email: 'zion.chen2968@school.edu',
    avatar: avatars[0],
    module: 'Mobile App Design',
    grade: 30,
    progress: 20,
    lastActivity: 'Low engagement',
    status: 'At Risk',
  },
  {
    id: 'taylor-okafor',
    name: 'Taylor Okafor',
    email: 'taylor.okafor1285@school.edu',
    avatar: avatars[1],
    module: 'Visual Design',
    grade: 20,
    progress: 15,
    lastActivity: 'Missed Assignment',
    status: 'At Risk',
  },
]

const taylorProfile: LearnerProfile = {
  track: 'UI/UX Design Learning Track',
  lastActiveLabel: '10 days ago',
  overallProgress: 15,
  averageScore: 45,
  lessonsCompleted: '18/45',
  assignmentsCompleted: '2/10',
  recentActivities: [
    { activity: 'Missed Wireframe Challenge assignment deadline', module: 'Wireframing & Prototyping', date: 'Jul 30, 2026', status: 'Missed Deadline' },
    { activity: 'Submitted User Interview Plan assignment', module: 'UX Research Fundamentals', date: 'Jul 20, 2026', status: 'Submitted' },
    { activity: 'Completed UX Design Principles lesson', module: 'Introduction to UX Design', date: 'Jul 15, 2026', status: 'Completed' },
    { activity: 'Scored 48% on Module Quiz', module: 'Information Architecture', date: 'Jul 24, 2026', status: 'Low score' },
    { activity: 'No learning activity recorded', module: 'Visual UI Design', date: 'Aug 5, 2026', status: 'Inactive' },
  ],
  courses: [
    { course: 'UX Research Fundamentals', progress: 40, lessons: '05/15', grade: '50', status: 'In progress' },
    { course: 'Design Thinking Essentials', progress: 100, lessons: '15/15', grade: '40', status: 'Completed' },
    { course: 'User Research & Discovery', progress: 0, lessons: '0/20', grade: '—', status: 'Not Started' },
    { course: 'Wireframing Fundamentals', progress: 15, lessons: '20/30', grade: '38', status: 'At risk' },
    { course: 'Information Architecture', progress: 80, lessons: '10/20', grade: '70', status: 'In progress' },
  ],
  assignments: [
    { assignment: 'Wireframe Challenge', module: 'Wireframing & Prototyping', dueDate: 'Aug 5, 2026', score: '—', status: 'Pending' },
    { assignment: 'Research Report', module: 'UX Research Fundamentals', dueDate: 'Jul 20, 2026', score: '48%', status: 'Submitted' },
    { assignment: 'User Persona Creation', module: 'User Research', dueDate: 'Jul 15, 2026', score: '48%', status: 'Completed' },
    { assignment: 'User Flow Design', module: 'Information Architecture', dueDate: 'Aug 8, 2026', score: '—', status: 'Not started' },
    { assignment: 'User Interview Plan', module: 'UX Research Fundamentals', dueDate: 'Aug 3, 2026', score: '—', status: 'Missing' },
  ],
  quizzes: [
    { quiz: 'Wireframing Principles', module: 'Wireframing & Prototyping', attempts: 0, score: '—', status: 'Not Attempted' },
    { quiz: 'Visual Design Essentials', module: 'Visual UI Design', attempts: 0, score: '—', status: 'Not Attempted' },
    { quiz: 'UX Design Fundamentals', module: 'Introduction to UX Design', attempts: 1, score: '48%', status: 'Failed' },
    { quiz: 'Information Architecture Quiz', module: 'Information Architecture', attempts: 1, score: '70%', status: 'Passed' },
    { quiz: 'User Interview Plan', module: 'UX Research Fundamentals', attempts: 1, score: '48%', status: 'Missing' },
  ],
}

function buildDerivedProfile(learner: LearnerListItem): LearnerProfile {
  const grade = learner.grade ?? 0
  const progress = learner.progress

  const courseNames = [
    learner.module,
    'Design Thinking Essentials',
    'Information Architecture',
    'Wireframing Fundamentals',
  ]

  const statusFromProgress = (p: number) => {
    if (p === 0) return 'Not Started'
    if (p === 100) return 'Completed'
    if (p < 30) return 'At risk'
    return 'In progress'
  }

  return {
    track: `${learner.module} Learning Track`,
    lastActiveLabel: learner.lastActivity.includes('ago')
      ? learner.lastActivity.split('·').pop()?.trim() ?? 'Recently'
      : 'A while ago',
    overallProgress: progress,
    averageScore: grade,
    lessonsCompleted: `${Math.round((progress / 100) * 30)}/30`,
    assignmentsCompleted: `${Math.round((progress / 100) * 8)}/8`,
    recentActivities: [
      { activity: `Latest activity: ${learner.lastActivity.split('·')[0].trim()}`, module: learner.module, date: 'Aug 5, 2026', status: learner.status === 'At Risk' ? 'Missed Deadline' : 'Submitted' },
      { activity: `Progress update on ${learner.module}`, module: learner.module, date: 'Jul 28, 2026', status: progress > 50 ? 'Completed' : 'In active' },
      { activity: 'Scored on a recent module quiz', module: courseNames[1], date: 'Jul 20, 2026', status: grade < 50 ? 'Low score' : 'Submitted' },
    ],
    courses: courseNames.map((course, i) => {
      const p = i === 0 ? progress : Math.max(0, Math.min(100, progress + (i % 2 === 0 ? 20 : -15)))
      return {
        course,
        progress: p,
        lessons: `${Math.round((p / 100) * 20)}/20`,
        grade: p === 0 ? '—' : String(Math.max(grade - i * 5, 10)),
        status: statusFromProgress(p),
      }
    }),
    assignments: [
      { assignment: `${learner.module} Brief`, module: learner.module, dueDate: 'Aug 5, 2026', score: grade ? `${grade}%` : '—', status: learner.status === 'At Risk' ? 'Missing' : grade ? 'Submitted' : 'Not started' },
      { assignment: 'Peer Review Task', module: courseNames[1], dueDate: 'Jul 22, 2026', score: '—', status: 'Pending' },
      { assignment: 'Case Study Writeup', module: courseNames[2], dueDate: 'Jul 12, 2026', score: grade ? `${Math.min(grade + 10, 100)}%` : '—', status: grade ? 'Completed' : 'Not started' },
    ],
    quizzes: [
      { quiz: `${learner.module} Quiz`, module: learner.module, attempts: grade ? 1 : 0, score: grade ? `${grade}%` : '—', status: grade === 0 ? 'Not Attempted' : grade >= 50 ? 'Passed' : 'Failed' },
      { quiz: 'Module Checkpoint', module: courseNames[1], attempts: progress > 0 ? 1 : 0, score: progress > 0 ? `${Math.min(progress, 100)}%` : '—', status: progress === 0 ? 'Not Attempted' : progress >= 50 ? 'Passed' : 'Failed' },
      { quiz: 'Foundations Quiz', module: courseNames[2], attempts: 0, score: '—', status: 'Not Attempted' },
    ],
  }
}

const profilesById: Record<string, LearnerProfile> = {
  'taylor-okafor': taylorProfile,
}

export function getLearner(id: string): LearnerListItem | undefined {
  return learners.find((l) => l.id === id)
}

export function getLearnerProfile(learner: LearnerListItem): LearnerProfile {
  return profilesById[learner.id] ?? buildDerivedProfile(learner)
}
