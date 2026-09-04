import { api } from './apiClient'
import type {
  CountriesResponse,
  TracksResponse,
  CohortsResponse,
} from '../types/dashboard'

export const genericService = {
  async getCountries(params?: {
    search?: string
    status?: string
    start_date?: string
    end_date?: string
    per_page?: number
  }): Promise<CountriesResponse> {
    const query = new URLSearchParams()
    if (params?.search) query.append('search', params.search)
    if (params?.status !== undefined && params.status !== '') query.append('status', params.status)
    if (params?.start_date) query.append('start_date', params.start_date)
    if (params?.end_date) query.append('end_date', params.end_date)
    query.append('per_page', String(params?.per_page || 250))

    return api.get<CountriesResponse>(`/generic/v1/countries?${query.toString()}`)
  },

  async getTracks(): Promise<TracksResponse> {
    return api.get<TracksResponse>('/generic/v1/tracks')
  },

  async getCohorts(): Promise<CohortsResponse> {
    return api.get<CohortsResponse>('/generic/v1/cohorts')
  },
}
