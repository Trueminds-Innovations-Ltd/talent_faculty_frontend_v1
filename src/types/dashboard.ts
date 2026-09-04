import type { ApiResponse, User } from './auth'

export interface DashboardMetrics {
  overall_progress: number
  pending_assignments_count: number
  assessment_average: number
  learning_streak_days: number
}

export interface UpcomingItem {
  id?: string | number
  title: string
  date?: string
  due_date?: string
  duration?: string
  type?: string
  course_name?: string
}

export interface ContinueLearningItem {
  id?: string | number
  uuid?: string
  title: string
  instructor?: string
  progress: number
  tags?: string[]
  duration?: string
  banner_url?: string
}

export interface DashboardData {
  user: User
  metrics: DashboardMetrics
  upcoming_assignments: UpcomingItem[]
  upcoming_assessments: UpcomingItem[]
  continue_learning: ContinueLearningItem[]
}

export type DashboardResponse = ApiResponse<DashboardData[] | DashboardData>

export interface EnrollRequest {
  cohort_id: number
  track_id: number
}

export interface EnrollmentData {
  id: number
  user: {
    id: number
    full_name: string
    email: string
    username: string
  }
  track: {
    id: number
    name: string
  }
  cohort: {
    id: number
    name: string
  }
}

export type EnrollResponse = ApiResponse<EnrollmentData[]>

export interface Country {
  id: number
  name: string
  iso2: string
  phone_code: string
  currency_code?: string | null
  is_active: boolean
  created_at?: string
}

export interface CountriesPagination {
  current_page: number
  total: number
  per_page: number
  last_page: number
}

export interface CountriesData {
  countries: {
    data: Country[]
    meta?: CountriesPagination
  }
}

export type CountriesResponse = ApiResponse<CountriesData>

export interface Track {
  id: number
  name: string
  description?: string
  is_active?: boolean
}

export type TracksResponse = ApiResponse<Track[]>

export interface Cohort {
  id: number
  name: string
  start_date?: string
  end_date?: string
  is_active?: boolean
}

export type CohortsResponse = ApiResponse<Cohort[]>

export interface Course {
  id: number | string
  uuid?: string
  title: string
  instructor?: string | { name: string; role?: string; avatarUrl?: string }
  progress?: number
  total_lectures?: number
  completed_lectures?: number
  status?: string
  tags?: string[]
  duration?: string
  banner_url?: string
  description?: string
}

export type CoursesResponse = ApiResponse<Course[]>
export type CourseDetailResponse = ApiResponse<Course>
