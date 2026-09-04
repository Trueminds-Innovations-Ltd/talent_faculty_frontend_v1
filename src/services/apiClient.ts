import type { DeviceInfo } from '../types/auth'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api-faculty.truemindsltd.com'
export const BASE_URL = rawBaseUrl.replace(/\/+$/, '')

const TOKEN_KEY = 'talent_faculty_token'
const USER_KEY = 'talent_faculty_user'

export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const setStoredToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // ignore
  }
}

export const removeStoredToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore
  }
}

export const getStoredUser = <T = unknown>(): T | null => {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const setStoredUser = (user: unknown): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    // ignore
  }
}

export const removeStoredUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY)
  } catch {
    // ignore
  }
}

export const getClientDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return {
      device_id: 'server',
      device_type: 'web',
      device_name: 'Browser',
      device_os: 'Web',
    }
  }

  const ua = navigator.userAgent
  let os = 'Unknown OS'
  if (ua.indexOf('Win') !== -1) os = 'Windows'
  if (ua.indexOf('Mac') !== -1) os = 'MacOS'
  if (ua.indexOf('Linux') !== -1) os = 'Linux'
  if (ua.indexOf('Android') !== -1) os = 'Android'
  if (ua.indexOf('like Mac') !== -1) os = 'iOS'

  let browser = 'Browser'
  if (ua.indexOf('Firefox') !== -1) browser = 'Firefox'
  else if (ua.indexOf('Chrome') !== -1) browser = 'Chrome'
  else if (ua.indexOf('Safari') !== -1) browser = 'Safari'
  else if (ua.indexOf('Edge') !== -1) browser = 'Edge'

  return {
    device_id: `web-${navigator.language}-${window.screen.width}x${window.screen.height}`,
    device_fingerprint_hash: btoa(`${ua}-${navigator.language}-${window.screen.colorDepth}`).slice(0, 32),
    device_type: /Mobile|Android|iP(hone|od)/.test(ua) ? 'mobile' : 'desktop',
    device_name: `${browser} on ${os}`,
    device_os: os,
    device_ip: '',
    device_location: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
  }
}

export interface ApiError extends Error {
  status?: number
  details?: string
  errors?: Record<string, string[] | string>
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken()
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${BASE_URL}${cleanEndpoint}`

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  try {
    const res = await fetch(url, config)
    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const responseData = isJson ? await res.json() : await res.text()

    if (!res.ok) {
      let errorMessage = 'An error occurred during the request.'
      let details: string | undefined
      let errors: Record<string, string[] | string> | undefined

      if (typeof responseData === 'object' && responseData !== null) {
        errorMessage = responseData.message || responseData.error || responseData.details || `HTTP ${res.status}: ${res.statusText}`
        details = responseData.details
        errors = responseData.errors
      } else if (typeof responseData === 'string' && responseData.length > 0) {
        errorMessage = responseData
      }

      const error: ApiError = new Error(errorMessage)
      error.status = res.status
      error.details = details
      error.errors = errors

      throw error
    }

    return responseData as T
  } catch (err: unknown) {
    if ((err as ApiError).status) {
      throw err
    }
    const networkError: ApiError = new Error((err as Error)?.message || 'Network request failed. Please check your connection.')
    networkError.status = 0
    throw networkError
  }
}

export const api = {
  get: <T>(url: string, headers?: HeadersInit) => request<T>(url, { method: 'GET', headers }),
  post: <T>(url: string, body?: unknown, headers?: HeadersInit) =>
    request<T>(url, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    }),
  put: <T>(url: string, body?: unknown, headers?: HeadersInit) =>
    request<T>(url, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    }),
  delete: <T>(url: string, headers?: HeadersInit) => request<T>(url, { method: 'DELETE', headers }),
}
