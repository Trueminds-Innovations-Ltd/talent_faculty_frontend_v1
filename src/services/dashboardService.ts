import { api } from './apiClient'
import type {
  DashboardResponse,
  EnrollRequest,
  EnrollResponse,
  CoursesResponse,
  CourseDetailResponse,
} from '../types/dashboard'
import type { ApiResponse, User } from '../types/auth'

export const dashboardService = {
  async getDashboardData(): Promise<DashboardResponse> {
    return api.get<DashboardResponse>('/api/v1/dashboard')
  },

  async enrollCohort(payload: EnrollRequest): Promise<EnrollResponse> {
    return api.post<EnrollResponse>('/api/v1/dashboard/enroll', payload)
  },

  async getUserProfile(): Promise<ApiResponse<User>> {
    return api.get<ApiResponse<User>>('/api/v1/profile')
  },

  async getMyCourses(params?: {
    search?: string
    status?: string
    start_date?: string
    end_date?: string
  }): Promise<CoursesResponse> {
    const query = new URLSearchParams()
    if (params?.search) query.append('search', params.search)
    if (params?.status) query.append('status', params.status)
    if (params?.start_date) query.append('start_date', params.start_date)
    if (params?.end_date) query.append('end_date', params.end_date)

    const qs = query.toString()
    const endpoint = `/api/v1/profile/my-courses${qs ? `?${qs}` : ''}`
    return api.get<CoursesResponse>(endpoint)
  },

  async getAllCourses(params?: {
    search?: string
    status?: string
    start_date?: string
    end_date?: string
  }): Promise<CoursesResponse> {
    const query = new URLSearchParams()
    if (params?.search) query.append('search', params.search)
    if (params?.status) query.append('status', params.status)
    if (params?.start_date) query.append('start_date', params.start_date)
    if (params?.end_date) query.append('end_date', params.end_date)

    const qs = query.toString()
    const endpoint = `/api/v1/courses${qs ? `?${qs}` : ''}`
    return api.get<CoursesResponse>(endpoint)
  },

  async getCourseByUuid(courseUuid: string): Promise<CourseDetailResponse> {
    return api.get<CourseDetailResponse>(`/api/v1/courses/${courseUuid}`)
  },
}
