export interface User {
  id: string | number
  first_name: string
  last_name: string
  middle_name?: string | null
  username: string
  unique_user_id?: string
  email: string
  phone?: string | null
  phone_number?: string | null
  gender?: string | null
  dob?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  is_2fa_enabled?: boolean
  is_social_auth?: boolean
  is_locked?: boolean
  created_at?: string
  role?: string
}

export interface DeviceInfo {
  device_id?: string
  device_fingerprint_hash?: string
  device_type?: string
  device_name?: string
  device_os?: string
  device_ip?: string
  device_location?: string
}

export interface ApiResponse<T = unknown> {
  success?: boolean
  status?: boolean
  message?: string
  data?: T
  details?: string
  errors?: Record<string, string[] | string>
}

export interface LoginRequest extends DeviceInfo {
  email: string
  password: string
}

export interface AuthSuccessData {
  user: User
  token: string
}

export type LoginResponse = ApiResponse<AuthSuccessData>

export interface VerifyEmailRequest {
  email: string
  phone?: string
  verification_type: 'registration' | 'email' | 'password_reset'
  verifiable_type: 'user'
  device_id?: string
}

export type VerifyEmailResponse = ApiResponse<unknown[]>

export interface VerifyOtpRequest {
  email: string
  phone?: string
  verification_type: 'registration' | 'password_reset' | 'email'
  verifiable_type: 'user'
  otp: string
}

export interface VerifiedTokenData {
  verified_token: string
}

export type VerifyOtpResponse = ApiResponse<VerifiedTokenData>

export interface RegisterRequest extends DeviceInfo {
  first_name: string
  last_name: string
  middle_name?: string
  username: string
  email: string
  password: string
  phone_number: string
  country_id?: string | number
  role: 'intern' | 'student'
  verified_token: string
}

export type RegisterResponse = ApiResponse<AuthSuccessData>

export interface ForgotPasswordRequest {
  email: string
  phone?: string
  verification_type: 'password_reset'
  verifiable_type: 'user'
  device_id?: string
}

export type ForgotPasswordResponse = ApiResponse<unknown[]>

export interface ResetPasswordRequest {
  email: string
  password: string
  password_confirmation: string
  verified_token: string
}

export type ResetPasswordResponse = ApiResponse<unknown[]>
