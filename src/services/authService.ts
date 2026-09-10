import {
  api,
  getClientDeviceInfo,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  removeStoredToken,
  removeStoredUser,
} from './apiClient'
import type {
  User,
  LoginRequest,
  LoginResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../types/auth'

export const authService = {
  async login(payload: { email: string; password: string } & Partial<LoginRequest>): Promise<LoginResponse> {
    const deviceInfo = getClientDeviceInfo()
    const fullPayload: LoginRequest = {
      ...deviceInfo,
      ...payload,
    }

    const response = await api.post<LoginResponse>('/api/v1/auth/login', fullPayload)

    if (response?.data?.token) {
      setStoredToken(response.data.token)
    }
    if (response?.data?.user) {
      setStoredUser(response.data.user)
    }

    return response
  },

  async verifyEmail(payload: {
    email: string
    verification_type?: 'registration' | 'email' | 'password_reset'
    verifiable_type?: 'user'
    device_id?: string
  }): Promise<VerifyEmailResponse> {
    const deviceInfo = getClientDeviceInfo()
    const fullPayload: VerifyEmailRequest = {
      email: payload.email,
      verification_type: payload.verification_type || 'registration',
      verifiable_type: payload.verifiable_type || 'user',
      device_id: payload.device_id || deviceInfo.device_id || '',
    }

    return api.post<VerifyEmailResponse>('/api/v1/auth/verify-email', fullPayload)
  },

  async verifyOtp(payload: {
    email: string
    otp: string
    verification_type?: 'registration' | 'password_reset' | 'email'
    verifiable_type?: 'user'
  }): Promise<VerifyOtpResponse> {
    const fullPayload: VerifyOtpRequest = {
      email: payload.email,
      otp: payload.otp,
      verification_type: payload.verification_type || 'registration',
      verifiable_type: payload.verifiable_type || 'user',
    }

    return api.post<VerifyOtpResponse>('/api/v1/auth/verify-otp', fullPayload)
  },

  async register(payload: Omit<RegisterRequest, 'device_id' | 'device_fingerprint_hash' | 'device_type' | 'device_name' | 'device_os' | 'device_ip' | 'device_location'> & Partial<RegisterRequest>): Promise<RegisterResponse> {
    const deviceInfo = getClientDeviceInfo()
    const fullPayload: RegisterRequest = {
      ...deviceInfo,
      ...payload,
      role: payload.role || 'student',
    }

    const response = await api.post<RegisterResponse>('/api/v1/auth/register', fullPayload)

    if (response?.data?.token) {
      setStoredToken(response.data.token)
    }
    if (response?.data?.user) {
      setStoredUser(response.data.user)
    }

    return response
  },

  async forgotPassword(payload: {
    email: string
    verification_type?: 'password_reset'
    verifiable_type?: 'user'
    device_id?: string
  }): Promise<ForgotPasswordResponse> {
    const deviceInfo = getClientDeviceInfo()
    const fullPayload: ForgotPasswordRequest = {
      email: payload.email,
      verification_type: payload.verification_type || 'password_reset',
      verifiable_type: payload.verifiable_type || 'user',
      device_id: payload.device_id || deviceInfo.device_id || '',
    }

    return api.post<ForgotPasswordResponse>('/api/v1/auth/forgot-password', fullPayload)
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return api.post<ResetPasswordResponse>('/api/v1/auth/reset-password', payload)
  },

  logout(): void {
    removeStoredToken()
    removeStoredUser()
  },

  getStoredToken,
  getStoredUser: () => getStoredUser<User>(),
  isAuthenticated(): boolean {
    return !!getStoredToken()
  },
}
