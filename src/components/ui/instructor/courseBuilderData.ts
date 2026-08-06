// Placeholder data for the course builder views (Add Module / Create Lesson).
// This mirrors the "UX Research Fundamentals" example course from the design
// reference. The Courses page (owned by another teammate) will eventually
// replace this with real course data fetched by course id.

export interface BuilderLesson {
  id: string
  title: string
}

export interface BuilderModule {
  id: string
  label: string
  title: string
  lessonCount: number
  lessons: BuilderLesson[]
}

export const courseBuilderModules: BuilderModule[] = [
  {
    id: 'mod-1',
    label: 'Modules 1',
    title: 'UX Research Basics',
    lessonCount: 3,
    lessons: [
      { id: 'lsn-1', title: 'What Is UX Research' },
      { id: 'lsn-2', title: 'Why It Matters' },
      { id: 'lsn-3', title: 'Research Roles' },
    ],
  },
  { id: 'mod-2', label: 'Modules 2', title: 'User Understanding', lessonCount: 3, lessons: [] },
  { id: 'mod-3', label: 'Modules 3', title: 'Research Planning', lessonCount: 3, lessons: [] },
  { id: 'mod-4', label: 'Modules 4', title: 'User Interviews', lessonCount: 3, lessons: [] },
  { id: 'mod-5', label: 'Modules 5', title: 'Surveys & Data', lessonCount: 3, lessons: [] },
  { id: 'mod-6', label: 'Modules 6', title: 'Usability Testing', lessonCount: 3, lessons: [] },
  { id: 'mod-7', label: 'Modules 7', title: 'Research Analysis', lessonCount: 3, lessons: [] },
  { id: 'mod-8', label: 'Modules 8', title: 'User Models', lessonCount: 3, lessons: [] },
  { id: 'mod-9', label: 'Modules 9', title: 'Research Reports', lessonCount: 3, lessons: [] },
]

export const courseBuilderCourse = {
  title: 'UX Research Fundamentals',
  description: 'Master the core methods of UX research from user interviews to usability testing.',
  status: 'Published' as const,
  moduleCount: 10,
  lessonCount: 30,
  publishedLessonCount: '28/30',
  updatedLabel: 'updated just now',
  savedPercent: 93,
}
